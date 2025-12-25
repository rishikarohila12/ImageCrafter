import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { motion } from "framer-motion" // Ensure correct import
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ByCredit = () => {
  const { user, backendUrl, loadCreditData, token, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const initPay = async (order, razorpayKey) => {
  const options = {
    key: razorpayKey,
    amount: order.amount,
    currency: order.currency,
    name: 'Credits Payment',
    description: 'Credits Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      try {
        const { data } = await axios.post(
          backendUrl + '/api/user/verify-razor',
          response,
          { headers: { token } }
        );

        if (data.success) {
          loadCreditData();
          navigate('/');
          toast.success('Credits added successfully');
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const paymentRazorpay = async (planId) => {
  try {
    if (!user) return setShowLogin(true);

    const { data } = await axios.post(
      backendUrl + '/api/user/pay-razor',
      { planId },
      { headers: { token } }
    );

    if (data.success) {
      initPay(data.order, data.key); // ✅ correct
    }
  } catch (err) {
    toast.error("Payment initiation failed");
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='min-h-[80vh] flex flex-col items-center pt-14 pb-20'
    >
      {/* Badge Indicator */}
      <span className='px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4'>
        Pricing Models
      </span>
      
      <h1 className='text-4xl md:text-5xl font-bold text-slate-900 mb-4'>Ready to create?</h1>
      <p className='text-slate-500 mb-12 max-w-md text-center'>Choose a plan that fits your creative needs. Unlock high-resolution generations and priority support.</p>

      {/* Plans Container */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4'>
        {plans.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className={`relative group bg-white border ${item.id === 'Advanced' ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-slate-100'} p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden`}
          >
            {/* Highlight for Popular Plan */}
            {item.id === 'Advanced' && (
              <div className='absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-xl text-xs font-bold'>
                Most Popular
              </div>
            )}

            <div className='flex items-center gap-4 mb-6'>
              <div className='p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors'>
                <img width={32} src={assets.logo_icon} className='group-hover:scale-110 transition-transform' alt=""/>
              </div>
              <div>
                <h3 className='font-bold text-xl text-slate-900'>{item.id}</h3>
                <p className='text-xs text-slate-400 uppercase font-semibold tracking-wider'>{item.credits} Credits</p>
              </div>
            </div>

            <p className='text-slate-500 text-sm leading-relaxed mb-8'>{item.desc}</p>
            
            <div className='flex items-baseline gap-1 mb-8'>
              <span className='text-4xl font-extrabold text-slate-900'>${item.price}</span>
              <span className='text-slate-400 font-medium'>/ credits</span>
            </div>

            <button 
              onClick={() => paymentRazorpay(item.id)}
              className={` cursor-pointer w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2
                ${item.id === 'Advanced' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'}
                active:scale-95 group-hover:scale-[1.02]`}
            >
              {user ? 'Purchase Now' : 'Get Started'}
              <svg className="w-4 h-4 group-hover:translate-x-1   transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ByCredit
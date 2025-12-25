import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion' // 'motion/react' ko 'framer-motion' se replace kiya
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='flex flex-col items-center text-center mt-10 px-4'
    >
      {/* 1. Pro Badge Styling (Static/Non-editable feel) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className='inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-8'
      >
        <div className='flex items-center gap-2'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-indigo-500'></span>
          </span>
          <p className='text-xs font-bold tracking-[0.15em] text-slate-500 uppercase'>
            Best AI Image <span className='text-indigo-600'>Generator</span>
          </p>
        </div>
      </motion.div>

      {/* 2. Main Heading with Indigo Contrast */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className='mt-4 max-w-2xl text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]'
      >
        Turn text to <span className='bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent'>image</span>, in seconds.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className='mt-6 max-w-lg text-lg text-slate-500 leading-relaxed'
      >
        Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type and watch the magic happen.
      </motion.p>

      {/* 3. Pro Button with Improved Hover & Cursor */}
      <motion.button 
        whileHover={{ scale: 1.05, backgroundColor: '#4f46e5' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClickHandler}
        className='mt-10 px-12 py-4 bg-slate-900 text-white rounded-full font-semibold flex items-center gap-3 shadow-xl shadow-indigo-100 transition-all cursor-pointer group'
      >
        Generate Images 
        <img className='w-5 group-hover:rotate-12 transition-transform' src={assets.star_group} alt="" />
      </motion.button>

      {/* 4. Styled Image Grid (Adding Depth) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className='mt-16 flex flex-wrap justify-center gap-4'
      >
        {[assets.sample_img_1, assets.sample_img_2, assets.sample_img_1, assets.sample_img_2].map((img, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -8, scale: 1.02 }}
            className='p-1.5 bg-white rounded-2xl shadow-lg border border-slate-50'
          >
            <img 
              className='w-24 sm:w-28 rounded-xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer' 
              src={img} 
              alt="" 
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Header
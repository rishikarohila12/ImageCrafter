import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from "framer-motion"
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (input) {
      setLoading(true);
      const generatedImage = await generateImage(input)
      if (generatedImage) {
        setImageLoaded(true);
        setImage(generatedImage)
      }
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col min-h-[85vh] justify-center items-center px-4 py-10'
    >
      <div className='w-full max-w-lg'>
        {/* Image Display Section with Neon Glow */}
        <div className='relative group rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(79,70,229,0.15)] border border-slate-200/50 bg-white p-2'>
          <div className='relative overflow-hidden rounded-2xl'>
            <img 
              src={image} 
              className={`w-full h-auto object-cover transition-all duration-700 ${loading ? 'blur-sm scale-105' : 'blur-0 scale-100'}`} 
              alt="AI Output" 
            />
            
            {/* Pro Loading Overlay */}
            {loading && (
              <div className='absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[2px]'>
                <div className='w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-lg'></div>
                <p className='mt-4 text-white font-bold tracking-widest text-xs uppercase drop-shadow-md'>Synthesizing Art...</p>
              </div>
            )}
            
            {/* Bottom Progress Bar */}
            <div className='absolute bottom-0 left-0 w-full h-1.5 bg-slate-100'>
              <div 
                className={`h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-[10s] ease-out ${loading ? 'w-full' : 'w-0'}`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {/* Phase 1: Interactive Search Bar */}
        {!isImageLoaded && !loading && (
          <motion.form 
            key="input-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={onSubmitHandler} 
            className='flex w-full max-w-2xl bg-white border border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-1.5 mt-12 rounded-full ring-4 ring-indigo-50/50'
          >
            <input
              onChange={e => setInput(e.target.value)} 
              value={input}
              type="text" 
              placeholder='Describe your imagination...' 
              className='flex-1 bg-transparent outline-none ml-6 text-slate-700 placeholder:text-slate-400 font-medium' 
            />
            <button 
              type='submit' 
              className='bg-slate-900 hover:bg-indigo-600 px-10 py-4 text-white rounded-full transition-all duration-300 cursor-pointer font-bold shadow-lg shadow-indigo-100 active:scale-95'
            >
              Generate
            </button>
          </motion.form>
        )}

        {/* Phase 2: Professional Action Buttons */}
        {isImageLoaded && !loading && (
          <motion.div 
            key="action-buttons"
            initial={{ opacity: 0, zoom: 0.9 }}
            animate={{ opacity: 1, zoom: 1 }}
            className='flex flex-wrap gap-4 justify-center mt-12'
          >
            <button 
              onClick={() => { setImageLoaded(false); setInput('') }}
              className='group flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer font-bold shadow-sm'
            > 
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate Another 
            </button>
            
            <a 
              href={image} 
              download 
              className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-12 py-4 text-white rounded-full transition-all duration-300 cursor-pointer font-bold shadow-[0_10px_25px_rgba(79,70,229,0.3)] hover:shadow-indigo-400/50'
            >
              Download
              <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Result
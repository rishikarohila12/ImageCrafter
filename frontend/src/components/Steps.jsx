import React from 'react'
import {motion} from 'framer-motion'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <motion.div 
     initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
    className='flex flex-col items-center justify-centermy-32 '>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
<p className='text-lg text-gray-60 mb-8'>Transform words into Stunning image</p>
<div className='space-y-4 w-full max-w-3xl text-sm'>{stepsData.map((item,index)=>(
    <div key={index}
    className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border-white cursor-pointer hover:sacle-[1.02] transition-all duration-300 rounded-lg'>
        <img width={40} src ={item.icon}/>
        <div children>
            <div className='text-xl font-medium'><h2>{item.title}</h2>
            <p className='text-gray-500'>{item.description}</p>
            </div>
        </div>
        </div>
))}</div>
    </motion.div>
  )
}

export default Steps
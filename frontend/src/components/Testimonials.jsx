import React from 'react'
import { motion } from "motion/react"
import { testimonialsData,assets } from '../assets/assets'

const Testimonials = () => {
  return (
        <motion.div 
        
        initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
        className='flex flex-col items-center justify-center my-20 p-12'>

 <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customers testimonials</h1>
        <p className='text-gray-500 mb-12'>What are Users are saying</p>
    <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((testimonial,index)=>(
            <div key ={index}
            className='bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                <img src={testimonial.image} alt="" className='rounded-full w-14'/>
                <h2>{testimonial.name}</h2>
                <p className='text-gray-500 mv-4'>{testimonial.role}</p>
                <div className='flex mb-4'>
                    {
                        Array(testimonial.stars).fill().map((item,index)=>(
                            <img key={index} src={assets.rating_star}/>
                        ))
                    }
                </div>
                <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
            </div>
        ))}
    </div>
    </motion.div>
  )
}

export default Testimonials
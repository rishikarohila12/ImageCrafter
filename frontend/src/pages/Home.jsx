import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import { Description } from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateButton from '../components/GenerateButton'

const Home = () => {
  return (
    <div className='flex flex-col gap-y-24 md:gap-y-40 pb-20'>
        {/* Pro Developer Touch: Use a wrapper with a slight scale-in animation 
           and refined spacing for a clean look.
        */}
        <div className='animate-in fade-in zoom-in-95 duration-700 delay-100'>
            <Header/>
        </div>

        <section className='relative'>
            {/* Soft decorative glow behind content */}
            <div className='absolute -left-20 top-0 w-72 h-72 bg-indigo-50 rounded-full blur-[120px] -z-10' />
            <Steps/>
        </section>

        <section className='reveal-on-scroll'>
            <Description/>
        </section>

        <section className='reveal-on-scroll relative'>
            <div className='absolute -right-20 top-0 w-72 h-72 bg-cyan-50 rounded-full blur-[120px] -z-10' />
            <Testimonials/>
        </section>

        <section className='reveal-on-scroll hover:scale-[1.02] transition-transform duration-500'>
            <GenerateButton/>
        </section>
    </div>
  )
}

export default Home
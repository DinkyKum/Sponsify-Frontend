import React from 'react'
import Hero from './Hero'
import Testimonials from './Testimonials'
import Features from './Features'
import Timeline from './Timeline'
import ContactUs from './ContactUs'

const Home = () => {
  return (
    <div className='bg-black'>
      <Hero/>
      <Features/>
      <Timeline/>
      <Testimonials/>
      <ContactUs/>
    </div>
  )
}

export default Home
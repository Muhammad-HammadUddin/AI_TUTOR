import React from 'react'
import Navbar from '../components/navbar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorksSection from '../components/HowItWorksSection'
import PreviousQuestionsSection from '../components/PreviousQuestionsSection'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
    <Navbar/>
    <HeroSection/>
    <FeaturesSection/>
    <HowItWorksSection/>
    <PreviousQuestionsSection/>
    <Footer/>
    </div>
  )
}

export default HomePage
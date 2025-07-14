import React from 'react'
import Navbar from '../components/navbar.jsx'
import HeroSection from '../components/HeroSection.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'
import HowItWorksSection from '../components/HowItWorksSection.jsx'
import PreviousQuestionsSection from '../components/PreviousQuestionsSection.jsx'
import Footer from '../components/Footer.jsx'

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
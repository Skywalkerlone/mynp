// pages/index.js
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Services from '../components/Services'
import Marquee from '../components/Marquee'
import Web from '../components/Web'
import Gallery from '../components/Gallery'
import About from '../components/pages/about'
import Contact from '../components/Contact'
import Prompts from '../components/prompt'
import SocialMedia from '../components/SocialMedia'
import Footer from '../components/Footer'
import Resume from '../components/Resume'
import EducationalPortfolio from '../components/EducationalPortfolio'
import SocialMediaExpertise from '../components/SocialMediaExpertise'
import Chatbot from '../components/chatbot'

export default function Index() {
  return (
    <>
      <Navbar />
      <SocialMedia />
      <main>
        <Home />
       
         <Services /> 
         <Marquee />
         <Web /> 
         <Prompts />
         <Gallery />   
      
         <SocialMediaExpertise /> 
         <EducationalPortfolio />
         
         <Chatbot />  

         <Resume /> 
         <About /> 
        <Contact /> 
         <Footer />
      
      </main>
      {/* */}
    </>
  )
}
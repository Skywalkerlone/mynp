// pages/index.js
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Services from '../components/Services'
import Marquee from '../components/Marquee'
import Web from '../components/Web'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Contact from '../components/Contact'
import SocialMedia from '../components/SocialMedia'
import Footer from '../components/Footer'
import Resume from '../components/Resume'
import EducationalPortfolio from '../components/EducationalPortfolio'
import SocialMediaExpertise from '../components/SocialMediaExpertise'
import Chatbot from '../components/chatbot'
// import TestimonialForm from "../components/TestimonialForm";
// import TestimonialList from "../components/TestimonialList";



export default function Index({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* Consider placing SocialMedia either here or inside main, not both */}
      {/* <SocialMedia /> */}
 <SocialMedia />
      <main>
        <Home darkMode={darkMode} />
       
        <Services />
        <Marquee />
        <Web />
        <Gallery />
        <SocialMediaExpertise />
         <EducationalPortfolio />
            {/* <TestimonialForm /> */}
      {/* <TestimonialList /> */}
        <Resume />
        <About />
        <Contact />
           <Chatbot />
      </main>

      <Footer />
    </>
  )
}

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


export default function Index({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <SocialMedia />
      <main>
        <Home />
        <SocialMedia />
        <Services />
        <Marquee />
        <Web />
        <Gallery />
        <Resume />
        <About />

        <Contact />
        
      </main>
      <Footer />
    </>
  )
}

import './App.css'
import CarFinancing from './components/CarFinancing'
import CarModalWrapper from './components/CarModalWrapper'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import WarrantySection from './components/WarrantySection'

function App() {

  return (
    <>
      <Navbar/>
      <HeroSection/>
      <CarModalWrapper/>
      <Gallery
        theme='dark'
      />
      <WarrantySection/>
      <CarFinancing/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App

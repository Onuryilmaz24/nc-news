import { useState } from 'react'
import './App.css'
import { HeaderNav } from './Components/HeaderNav'
import { Footer } from './Components/Footer'
import { Route , Routes} from 'react-router-dom'
import { HomePage } from './Components/HomePage'
import { AllArticles } from './Components/AllArticles'

function App() {

  return (
    <>
      <HeaderNav/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/articles' element={<AllArticles/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App

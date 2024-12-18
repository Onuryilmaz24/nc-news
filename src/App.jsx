import { useState } from 'react'
import './App.css'
import { HeaderNav } from './Components/HeaderNav'
import { Footer } from './Components/Footer'
import { Route , Routes} from 'react-router-dom'
import { HomePage } from './Components/HomePage'
import { AllArticles } from './Components/AllArticles'
import { SingleArticle } from './Components/SingleArticle'
import { LogInPage } from './Components/LogInPage'
import { UserPage } from './Components/UserPage'
import { ArticlesByTopic }from './Components/ArticlesByTopic'
import { TopicsPage }from './Components/TopicsPage'

function App() {

  return (
    <>
      <HeaderNav/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/articles' element={<AllArticles/>}/>
        <Route path='/articles/:article_id' element={<SingleArticle/>}/>
        <Route path='/login' element={<LogInPage/>}/>
        <Route path='/:username/userpage' element={<UserPage/>}/>
        <Route path='/topics' element={<TopicsPage/>}/>
        <Route path='/topics/:slug' element={<ArticlesByTopic/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

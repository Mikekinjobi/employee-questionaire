import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Table1 from './pages/Table1'
import Table2 from './pages/Table2'
import './App.css'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page6 from './pages/Page6'
import Page7 from './pages/Page7'
import TestQuestions from './pages/multi/TestPage'
import  Form  from './pages/multi/Form'
import DownloadExcelController from './downloadController/DownloadController'
import CountdownTimer from './components/CountDownComponent'
import QuestionsPage from './pages/QuestionsPage'



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page1/>}/>
      <Route path='/instructions' element={<Page2/>}/>
      <Route path='/comprehension-questions' element={<Page3/>}/>
      <Route path='/test' element={<TestQuestions/>}/>
      <Route path='form' element={<Form/>}/>
      <Route path='/download' element={<DownloadExcelController/>}/>
      <Route path='/questions' element={<Form/>}/>
      {/* <Route path='/table2' element={<Table2/>}/>
      <Route path='/demographic-questions' element={<Page6/>}/>
      <Route path='/thank-you' element={<Page7/>}/> */}
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

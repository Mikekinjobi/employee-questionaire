import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import TestQuestions from './pages/multi/TestPage'
import  Form  from './pages/multi/Form'
import DownloadExcelController from './downloadController/DownloadController'



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page1/>}/>
      <Route path='/instructions' element={<Page2/>}/>
      <Route path='/comprehension-questions' element={<Page3/>}/>
      <Route path='/test' element={<TestQuestions/>}/>
      <Route path='/download' element={<DownloadExcelController/>}/>
      <Route path='/questions' element={<Form/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

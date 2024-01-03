import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='./login' />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

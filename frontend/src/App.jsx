import { useState } from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className='min-h-screen bg-base-200 transition-colors duration-300' data-theme="dark">
    <NavBar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
    </Routes>
  </div>
  )
}

export default App

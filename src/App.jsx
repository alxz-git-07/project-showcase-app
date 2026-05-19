import React from 'react'
import{BrowserRouter,Routes,Route}from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Layout from './components/Layout'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<Layout/>}>
      <Route path='/'element={<Home/>}/>
      <Route path='/shop'element={<Shop/>}/>
      </Route>
    </Routes>
    
    </BrowserRouter>
    // <div>
    //   <Home/>
    //   <Shop/>
      
    // </div>
  )
}

export default App

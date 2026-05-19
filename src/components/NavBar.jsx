import React from 'react'
import { NavLink } from 'react-router-dom'
function NavBar() {
  return (
    <nav className='w-full flex justify-between items-center px-12 py-3 bg-[#b3937d] text-sm md:text-base'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      
    </nav>
  )
}

export default NavBar

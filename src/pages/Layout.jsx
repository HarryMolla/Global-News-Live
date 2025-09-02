import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <main>
            <NavBar/>
            <main>
            <Outlet/>
            </main>
            <Footer/>
        </main>
    </div>
  )
}

export default Layout
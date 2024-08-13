import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { getProjects } from './components/navbar/NavBar'
import './App.css'
import SideNavBar from './components/navbar/NavBar'
import HomePage from './components/home-page/HomePage'

function App() {

  return (
    <div className='App w-full h-screen flex'>
      <SideNavBar />
      <div className='w-full h-screen flex'>
        <Outlet />
        <HomePage />
      </div>
    </div>
  )
}

export default App;

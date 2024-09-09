import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './App.css'
import SideNavBar from './components/navbar/NavBar'

function App() {

  return (
    <div className='min-h-screen flex'>
      <SideNavBar />
      <div className='w-full min-h-screen flex'>
      <Outlet />
      </div>
    </div>
  )
}

export default App;

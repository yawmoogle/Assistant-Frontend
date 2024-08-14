import { useState } from 'react'
import { Outlet, Link, useLoaderData } from 'react-router-dom'
import './App.css'
import SideNavBar from './components/navbar/NavBar'
import HomePage from './components/home-page/HomePage'

function App() {

  return (
    <div className='h-screen flex'>
      <SideNavBar />
      <div className='w-full h-screen flex'>
        <Outlet />
      </div>
    </div>
  )
}

export default App;

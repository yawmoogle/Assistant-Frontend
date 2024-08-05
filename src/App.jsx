import Form from './components/Form'
import { useState } from 'react'
import './App.css'
import SideNavBar from './components/navbar/NavBar'

function App() {

  return (
    <div className='App w-full h-screen flex'>
      <SideNavBar />
      <Form />
    </div>
  )
}

export default App;

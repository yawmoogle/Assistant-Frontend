import Form from './assets/components/Form'
import { useState } from 'react'
import Roles from './assets/components/Roles'
import Details from './assets/components/Details'
import './App.css'
import SideNavBar from './navbar/NavBar'

function App() {

  return (

    <div className="App w-full">
      <div className='sidebar'>
        <SideNavBar />
      </div>
      <div className='form-body'>
        <Details />
        <Form />
        <Roles />
      </div>
    </div>
  )
}

export default App

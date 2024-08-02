import Form from './components/Form'
import { useState } from 'react'
import Roles from './components/Roles'
import Details from './components/Details'
import './App.css'
import './index.css'
import SideNavBar from './components/navbar/NavBar'

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

export default App;
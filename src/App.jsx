import Form from './components/Form'
import { useState } from 'react'
import Roles from './components/Roles'
import Details from './components/Details'
import './App.css'
import SideNavBar from './components/navbar/NavBar'

function App() {

  return (
    <div className="app-container">
      <SideNavBar />
      <div className="main-content">
        <Form />
        <div className="details-and-roles">
          <Details />
          <Roles />
        </div>
      </div>
    </div>
  )
}

export default App;
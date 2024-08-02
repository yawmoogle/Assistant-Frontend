import Form from './assets/components/Form'
import { useState } from 'react'
import Roles from './assets/components/Roles'
import Details from './assets/components/Details'
import './App.css'
import SideNavBar from './navbar/NavBar'

function App() {

  return (
    <>
      <SideNavBar />
    </>
    <div className="App">
      <Form/>
    <div className="App w-full">
      <Details/>
      <Roles/>
    </div>
  )
}

export default App

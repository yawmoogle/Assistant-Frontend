import { useState } from 'react'
import Roles from './assets/components/Roles'
import Details from './assets/components/Details'
import './App.css'

function App() {

  return (
    <div className="App w-full">
      <Details/>
      <Roles/>
    </div>
  )
}

export default App

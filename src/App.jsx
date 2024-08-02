import Form from './assets/components/Form'
import { useState } from 'react'
import Roles from './assets/components/Roles'
import Details from './assets/components/Details'
import './App.css'

function App() {

  return (   
    <div className="App w-full">
      <Details/>
      <Form/>
      <Roles/>
    </div>
  )
}

export default App;

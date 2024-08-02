import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideNavBar from './navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SideNavBar />
    </>
  )
}

export default App

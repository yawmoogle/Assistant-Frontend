import { Outlet } from 'react-router-dom'
import './home-page.css'
import SideBar from './sidebar/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const HomePage = () =>  {

  const jwt = true;

  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
    console.log(showSidebar)
  }

  return (
    <div className='home-page'>
      <div className="header">
        <div className="hamburger-menu">
          <button onClick={toggleSidebar}>
            {showSidebar ? <CloseIcon /> :<MenuIcon />}
          </button>
        </div>
        <div className="login-logout">
          <button>
            { jwt ? <LogoutIcon /> : <LoginIcon />} 
          </button>
        </div>
      </div>
      <div className="body">
        <SideBar showSidebar={showSidebar} />
        <div className='main-content'>
          <Outlet />
        </div>
      </div>
      <div className="footer">

      </div>
    </div>
  )
}

export default HomePage;

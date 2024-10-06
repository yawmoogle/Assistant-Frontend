import { Outlet, useNavigate } from 'react-router-dom'
import './home-page.css'
import SideBar from './sidebar/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../../contexts/useAuthContext';

const HomePage = () =>  {

  const [showSidebar, setShowSidebar] = useState(false)
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/register', { replace: true })
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
            { user ? <LogoutIcon onClick={handleLogout} /> : <LoginIcon />} 
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

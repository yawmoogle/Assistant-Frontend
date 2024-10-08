import { Outlet, useNavigate } from 'react-router-dom'
import './home-page.css'
import SideBar from './sidebar/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState, useRef } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../../contexts/auth/useAuthContext';
import { Alert } from '@mui/material';
import { useAlertContext } from '../../contexts/alert/useAlertContext';

const HomePage = () =>  {

  const [showSidebar, setShowSidebar] = useState(false)
  const { user, setUser } = useAuthContext();
  const { alert, setAlert } = useAlertContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 10000);
  }, [setAlert])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const sidebarRef = useRef(null);

  const handleLogout = () => {
    setUser(null);
    setAlert({ severity: 'success', message: 'Logout Successfully!'})
    navigate('/register', { replace: true })
  }

  const handleClickOutside = (e) => {
    if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setShowSidebar(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

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
        <SideBar showSidebar={showSidebar} sidebarRef={sidebarRef}/>
        <div className='main-content'>
          {alert ? <Alert severity={alert.severity}>{alert.message}</Alert> : <></>}
          <Outlet />
        </div>
      </div>
      <div className="footer">

      </div>
    </div>
  )
}

export default HomePage;

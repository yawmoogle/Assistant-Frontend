import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'


export default function NavBar() {
  const [activeLink, setActiveLink] = useState('home');

  const handleItemClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="sidenav">
      <ul>
        <li className='border'>
            <div className='gg-menu'></div>
        </li>
        <li className='border'>
            <div className='gg-add-r'></div>
        </li>
      </ul>
    </div>
  );
}



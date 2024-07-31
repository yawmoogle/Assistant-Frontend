import React, { useState } from 'react';
import './NavBar.css'

export default function NavBar() {
  const [activeLink, setActiveLink] = useState('home');

  const handleItemClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="sidenav">
      <ul>
        <li className={`nav-item ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleItemClick('home')}>Home</li>
        <li className={`nav-item ${activeLink === 'about' ? 'active' : ''}`} onClick={() => handleItemClick('about')}>About</li>
        <li className={`nav-item ${activeLink === 'contact' ? 'active' : ''}`} onClick={() => handleItemClick('contact')}>Contact</li>
      </ul>
    </div>
  );
}



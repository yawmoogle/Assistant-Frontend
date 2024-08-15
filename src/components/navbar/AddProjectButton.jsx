import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'


export default function AddProjectButton({onClick, type = 'button'}) {


  return (
        <button type={type} onClick={onClick} className='nav-button'>
            <div className='gg-add-r'></div>
        </button>
  );
}



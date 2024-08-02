import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'


export default function SelectProjectButton() {


  return (
    <div>
        <button className='nav-button'>
            <div className='gg-ereader' ></div>
        </button>
        <p className='caption'>Product Backlog</p>
    </div>
  );
}



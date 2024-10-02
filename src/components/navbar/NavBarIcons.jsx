import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'


export default function SelectProjectButton() {


  return (
    <div className="flex flex-col items-center">
        <button className='nav-button flex items-center justify-center'>
            <div className='gg-ereader' ></div>
        </button>
        <p className='caption'>Product Backlog</p>
    </div>
  );
}



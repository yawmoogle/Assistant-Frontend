import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'
import AddProject from './AddProjectButton'
import SelectProject from './SelectProjectButton'


export default function NavBar() {

    // const addProject = 

  return (
    <div className="sidenav">
      <ul>
        <li >
            <div className='gg-menu'></div>
        </li>
      </ul>
      <ul>
        <AddProject/>
      </ul>
      <br></br>
      <ul>
        <SelectProject />
      </ul>
    </div>
  );
}



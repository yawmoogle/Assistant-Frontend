import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'
import AddProject from './AddProjectButton'
import SelectProject from './SelectProjectButton'
import Form from '../Form';


export default function NavBar() {

  const [showProject, setShowButton] = useState(false);

  const handleButtonClick = (e) => {
    // Logic to hide the button
    e.preventDefault();
    setShowButton(true);
  };

  return (
    <>
      <div className="sidenav">
        <ul>
          <li >
              <div className='gg-menu'></div>
          </li>
        </ul>
        <ul>
          <AddProject onClick={handleButtonClick} />
        </ul>
        <br></br>
        <ul>
          {showProject && <SelectProject />}
        </ul>
      </div>
      <div className='App w-full h-screen flex'>
        {showProject && <Form />}
      </div>
    </>
  );
}



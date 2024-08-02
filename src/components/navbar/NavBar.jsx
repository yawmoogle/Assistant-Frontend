import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'
import AddProject from './AddProjectButton'
import SelectProject from './SelectProjectButton'


export default function NavBar() {

  const [showButton, setShowButton] = useState(false);

  const handleButtonClick = (e) => {
    // Logic to hide the button
    e.preventDefault();
    setShowButton(true);
  };

  return (
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
        {showButton && <SelectProject />}
      </ul>
    </div>
  );
}



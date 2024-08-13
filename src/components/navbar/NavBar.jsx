import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'
import AddProject from './AddProjectButton'
import SelectProject from './SelectProjectButton'


export default function NavBar() {

  const [showProject, setShowButton] = useState(false);
  const [projects, showProjects] = useState([]);

  const handleButtonClick = () => {
    // Logic to hide the button
    const newProject = {
      id: Date.now(),
      name: 'Project ${projects.length+1}'
    };
    setProjects([...projects, newProject]);
  };

  return (
      <div className="sidenav">
        <div className="menu-icon">
          <div className="gg-menu">
            
          </div>
        </div>
        <div className="add-project-container">
          <AddProject onClick={handleButtonClick} />
        </div>
        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className="project-button">
              <Link to={'/Assistant-Frontend/backlog/${project.id}'}>{project.name}</Link>
            </div>
          ))}
        </div>
      </div>
  );
}



import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'
import AddProject from './AddProjectButton'
import SelectProject from './SelectProjectButton'
import { 
  Outlet,
  Link,
  useLoaderData,
  Form,
} from 'react-router-dom'
import { getProjects } from '../../projects'

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export default function NavBar() {

  const { projects } = useLoaderData();  

  const [showProject, setShowButton] = useState(false);

  return (
      <div className="sidenav">
        <div className="menu-icon">
          <div className="gg-menu">
            
          </div>
        </div>
        <div className="add-project-container">
          <Form method="post">
            <button className="gg-add-r" type="submit">
            </button>
          </Form>
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



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
import { getProjects, createProject } from '../../projects'

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export async function action() {
  const project = await createProject();
  return { project };
}

export default function NavBar() {

  const { projects } = useLoaderData();  

  return (
      <div className="sidenav justify-items-center">
        <div className="menu-icon mb-4 ml-6">
          <div className="gg-menu">
          </div>
        </div>
        <div className="add-project-container ml-4 mb-4">
          <Form method="post">
            <AddProject type="submit">
            </AddProject>
          </Form>
        </div>
        <div className="projects-list ml-4 justify-items-center">
          <nav>
          {projects.map(project => (
            <div key={project.id}>
            <Link to={`/Assistant-Frontend/backlog/${project.id}`}>
            <button key={project.id} className="nav-button">
            <div className="gg-ereader text-black">
            </div>
            </button>
            </Link>
            <p className="caption text-white">{project.id}</p>
            </div>
          ))}
          </nav>
        </div>
      </div>
  );
}



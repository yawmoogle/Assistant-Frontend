import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'
import AddProject from './AddProjectButton'
import SelectProject from './SelectProjectButton'
import { 
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from 'react-router-dom'
import { getProjects, createProject } from '../../projects'

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export async function action() {
  const project = await createProject();
  return redirect(`/Assistant-Frontend/backlog/${project.id}/edit`);
}

export default function NavBar() {

  const { projects } = useLoaderData();  

  return (
      <div className="sidenav justify-items-center">
        <div className="add-project-container ml-4 mb-4">
          <Form method="post">
            <AddProject type="submit" />
          </Form>
        </div>
        <div className="projects-list ml-4 justify-items-center">
          <nav>
          {projects.map(project => (
            <div key={project.id}>
            <NavLink to={`/Assistant-Frontend/backlog/${project.id}`} className={({isActive, isPending}) =>
            isActive
              ? "active"
              : isPending
              ? "pending"
              : ""}>
            <button key={project.id} className="nav-button">
            <div className="gg-ereader text-black">
            </div>
            </button>
            </NavLink>
            <p className="caption text-white">{project.projectDetails.title}</p>
            </div>
          ))}
          </nav>
        </div>
      </div>
  );
}



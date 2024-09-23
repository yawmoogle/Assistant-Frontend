import React, { useState } from 'react';
import './NavBar.css'
import './NavBarIcons.css'
import AddProject from './AddNavIconButton'
import SelectProject from './NavBarIcons'
import { 
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
  return redirect(`/backlog/${project.id}/edit`);
}

export default function NavBar() {

  const { projects } = useLoaderData();  

  return (
      <div className="sidenav justify-items-center bg-sidebar overflow-y-auto">
        <div className="add-project-container ml-4 mb-4">
          <Form method="post">
            <AddProject type="submit" />
          </Form>
        </div>
        <div className="projects-list ml-4 justify-items-center">
          <nav>
          {projects.map(project => (
            <div key={project.id} className="mb-5">
            <NavLink to={`/backlog/${project.id}`} className={({isActive, isPending}) =>
            isActive
              ? "active"
              : isPending
              ? "pending"
              : ""}>
            <button key={project.id} className="nav-button bg-white">
            <div className="gg-ereader text-black bg-white">
            </div>
            </button>
            </NavLink>
            <p className="caption text-black">{project.projectDetails.title}</p>
            </div>
          ))}
          </nav>
        </div>
      </div>
  );
}



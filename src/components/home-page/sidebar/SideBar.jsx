import './sidebar.css'
import { NavLink, useLoaderData, Form, redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { createProject, getProjects } from '../../../projects'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export async function action() {
  const project = await createProject();
  return redirect(`/backlog/${project.uri}/edit`);
}

const SideBar = ({ showSidebar, sidebarRef }) => {

  const { projects } = useLoaderData();  

  return (
      <div ref={sidebarRef} className={`sidebar ${showSidebar ? "sidebar-show" : "sidebar-hide"}`}>
        <div className="navigation-items">
          <div className="navigation-item">
            <Form method="post">
              <button type='submit'>
                <AddCircleOutlineIcon />
              </button>
              <p className="caption">Add New</p>
            </Form>
          </div>
          <nav className="project-list">
            {projects.map(project => (
                <div key={project.uri} className="navigation-item">
                  <NavLink
                    to={`/backlog/${project.uri}`} 
                    className={({isActive, isPending}) => isActive ? "active" : isPending ? "pending" : "project"}
                  >
                    <ViewKanbanIcon />
                    <p className="caption">{project.projectDetails.title}</p>
                  </NavLink>
                </div>
            ))}
          </nav>
        </div>
      </div>
  );
}

SideBar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  sidebarRef: PropTypes.shape({
    current: PropTypes.any
  })
};

export default SideBar;
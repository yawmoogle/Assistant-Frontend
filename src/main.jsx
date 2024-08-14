import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import NavBar from './components/navbar/NavBar.jsx';
import Form from './components/Form.jsx'
import Backlog from './features/backlog/Backlog.jsx'
import './index.css'

const router =  createBrowserRouter([
  {
    path: "/Assistant-Frontend/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    loader: projectLoader,
    // action: appAction,
    children: [
      {
        path: "/Assistant-Frontend/backlog/:projectId",
        element: <Backlog />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

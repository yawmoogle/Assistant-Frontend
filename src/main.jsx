import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Form from './components/Form.jsx'
import './index.css'

const router =  createBrowserRouter([
  {
    path: "/Assistant-Frontend/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Assistant-Frontend/backlog/:projectId",
        element: <Form />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

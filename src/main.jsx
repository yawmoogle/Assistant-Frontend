import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx'
import ErrorPage from './features/backlog/routes/ErrorPage.jsx'
import HomePage from './components/home-page/HomePage.jsx'
import { loader as projectLoader, action as projectAction } from './components/navbar/NavBar.jsx';
import Form , { action as editAction } from './features/backlog/routes/BacklogForm.jsx'
import Backlog, { loader as backlogLoader } from './features/backlog/Backlog.jsx'
import './index.css'
import QAForm, { action as qaAction, loader as qaLoader } from './features/backlog/routes/QAForm.jsx';
import AuthenticationPage from './components/authentication/AuthenticationPage.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router =  createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: projectLoader,
    action: projectAction,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/backlog/:projectId",
        element: <Backlog />,
        loader: backlogLoader,
      },
      {
        path: "/backlog/:projectId/edit",
        element: <Form />,
        loader: backlogLoader,
        action: editAction,
      },
      {
        path: "/backlog/:projectId/questions",
        element: <QAForm />,
        loader: qaLoader,
        action: qaAction,
      }
    ]
  },
  {
    path: "/register",
    element: <AuthenticationPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

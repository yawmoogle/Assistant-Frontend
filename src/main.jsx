import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/home-page/HomePage.jsx'
import ErrorPage from './features/backlog/routes/ErrorPage.jsx'
import { loader as projectLoader, action as projectAction } from './components/home-page/sidebar/SideBar.jsx';
import Form , { action as editAction } from './features/backlog/routes/BacklogForm.jsx'
import Backlog, { loader as backlogLoader } from './features/backlog/Backlog.jsx'
import './index.css'
import QAForm, { action as qaAction, loader as qaLoader } from './features/backlog/routes/QAForm.jsx';
import AuthenticationPage from './components/authentication/AuthenticationPage.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import WelcomeCard from './components/home-page/outlets/WelcomeCard.jsx';
import AuthContextProvider from './contexts/auth/AuthContextProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AlertContextProvider from './contexts/alert/AlertContextProvider.jsx';

const router =  createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><HomePage /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    loader: projectLoader,
    action: projectAction,
    children: [
      {
        index: true,
        element: <WelcomeCard />
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
    <AuthContextProvider>
      <AlertContextProvider>
        <RouterProvider router={router} />
      </AlertContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

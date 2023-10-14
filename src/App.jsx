import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ChatIndex from './chat/ChatIndex';
import Profile from './profile/Profile';
import Login from './login/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatIndex />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;

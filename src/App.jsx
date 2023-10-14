import React from 'react';
import {Outlet, Route, Routes} from 'react-router-dom'
import ChatIndex from './chat/ChatIndex';
import Profile from './profile/Profile';
import Header from './header/header';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

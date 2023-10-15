import React from 'react';
import {Outlet, Route, Routes} from 'react-router-dom'
import Header from './components/header/header';

function App() {
  return (
    <div className='flex'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import {Outlet, Route, Routes} from 'react-router-dom'
import Header from './components/header/header';
import { docCookies } from './components/header/cookie';
import { Toast } from '@douyinfe/semi-ui';

function App() {
  useEffect(() => {
    if(docCookies.getItem("username") === null){
      Toast.warning("Please login first, redirecting to the login page...");
      setTimeout(() => {
        window.location.href="/login";
      }, 2000);
    }
  }, []);

  return (
    <div className='flex'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

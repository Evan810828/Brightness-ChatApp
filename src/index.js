import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom'
import App from './App';
import ChatIndex from './chat/ChatIndex';
import Profile from './profile/Profile';
import Login from './login/login';
import Social from './social/Social';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path='' element={<ChatIndex />} />
          <Route path='profile' element={<Profile />} />
          <Route path='social' element={<Social />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
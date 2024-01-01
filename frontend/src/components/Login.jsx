import React, { useState } from 'react'
import BackgroundImage from '../assets/images/Background.png';
import GroupImage from '../assets/images/GroupImage.png';
import '../styles/Login.css'
import Header from './Header';
import LoginForm from './LoginForm';


const Login = ({setUserEmail}) => {
  return (
    <div className="apple-vision-pro-ui">
      <Header/>
      <img className="background-icon" alt="BackgroundImage" src={BackgroundImage} />
      <div className="group-parent">
        <img className="group-icon" alt="GroupImage" src={GroupImage} />
        <b className="welcome-to">Welcome to</b>
        <b className="welcome-to">Goodspace Communications</b>
      </div>
      <LoginForm setUserEmail={setUserEmail} />
    </div>
  );
};

export default Login;

  
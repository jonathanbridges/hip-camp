import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Greeting = ({ currentUser, logout, openModal, closeModal }) => {

  const sessionLinks = () => (
    <div className="login-signup">
      <div className="login-spacer"></div>
      <button className="nav-btn" onClick={() => openModal('login')}>Log in</button>
      <div>
        <a className="signup-btn" onClick={() => openModal('signup')}>Sign up</a>
      </div>
    </div>
  );

  const personalGreeting = () => (
    <div className="current-user-logout">
      <p className="header-name">Hi, {currentUser.username}!</p>
      <img className="account-img" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/campicon.png" alt=""/>
      <div className="logoutButton">     
        <Link to="/" className="nav-btn" onClick={logout}>Log Out</Link>
      </div>
    </div>
  );
  
  closeModal();
  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
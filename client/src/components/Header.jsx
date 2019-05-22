import React from 'react';
import User from '../assets/User.svg';

export default ({ userLoggedIn }) => (
  <div className="App-header">
    <div className="content">
      <img src={User} width={40} alt="user-logo" />
      <p>{userLoggedIn}</p>
    </div>
  </div>
)
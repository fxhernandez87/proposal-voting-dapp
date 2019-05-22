import React from 'react';
import PropTypes from "prop-types";
import User from '../assets/User.svg';

const Header = ({ userLoggedIn }) => (
  <div className="App-header">
    <div className="content">
      <img src={User} width={40} alt="user-logo" />
      <p>{userLoggedIn}</p>
    </div>
  </div>
);


Header.propTypes = {
  userLoggedIn: PropTypes.string,
};

Header.defaultProps = {
  userLoggedIn: null
};

export default Header;
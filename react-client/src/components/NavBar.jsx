import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';


const NavBar = () =>
  (
    <div>
      <div name="nav-bar" className="nav-bar">
        <div className="logo-div nav-item">
          <img src={Logo} alt="waggl-logo" />
        </div>
        <div className="home-div nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </div>
        <div className="find-dog-div nav-item">
          <Link className="nav-link" to="/search">Find A Dog</Link>
        </div>
        <div className="signup-div nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </div>
        <div className="about-div nav-item">
          <Link className="nav-link" to="/about">About Us</Link>
        </div>
        <div className="create-dog nav-item">
          <Link className="nav-link" to="/create">Add a Dog</Link>
        </div>
      </div>
    </div>
  );

export default NavBar;

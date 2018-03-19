import React from 'react';

const NavBar = () =>
  (
    <div name="nav-bar" className="nav-bar">
      <div className="logo-div nav-item">
        <img src="https://i.imgur.com/p1VwVM9.png" alt="waggl-logo" />
      </div>
      <div className="home-div nav-item">
        Home
      </div>
      <div className="find-dog-div nav-item">
        Find A Dog
      </div>
      <div className="about-div nav-item">
        About Us
      </div>
    </div>
  );

export default NavBar;

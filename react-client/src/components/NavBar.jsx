import React, { Component } from 'react';
import { Icon } from 'antd';
import { scroller } from 'react-scroll';

class NavBar extends Component {
  static scrollToNav() {
    scroller.scrollTo('nav-bar', {
      duration: 800,
      delay: 100,
      smooth: true,
    });
  }

  render() {
    return (
      <div>
        <div className="splash">
          <div className="splash-items">
            <div className="company-name splash-item">
              waggl
            </div>
            <button className="adopt-button splash-item" onClick={() => { NavBar.scrollToNav(); }} >
              Adopt a new best friend <Icon className="down-icon" type="down" />
            </button>
          </div>
          <img src="https://i.imgur.com/K41ODje.jpg" alt="" />
        </div>
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
      </div>
    );
  }
}

export default NavBar;

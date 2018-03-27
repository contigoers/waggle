import React from 'react';
import { Icon } from 'antd';
import { scroller } from 'react-scroll';
import splashImage from '../assets/dog-video.mp4';

function scrollToNav() {
  scroller.scrollTo('nav-bar', {
    duration: 800,
    delay: 100,
    smooth: true,
  });
}

const Splash = () =>
  (
    <div className="splash">
      <div className="splash-items">
        <div className="company-name splash-item">
          waggl
        </div>
        <button className="adopt-button splash-item" onClick={() => { scrollToNav(); }} >
          Find your new best friend <Icon className="down-icon" type="down" />
        </button>
      </div>
      <div className="splash-media">
        <video autoPlay loop>
          <source src={splashImage} type="video/mp4" />
        </video>
      </div>
    </div>
  );

export default Splash;

// <img src={splashImage} alt="" />

import React from 'react';
import { Icon } from 'antd';
import { scroller } from 'react-scroll';
import splashImage from '../assets/splash-image.jpg';

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
          Adopt a new best friend <Icon className="down-icon" type="down" />
        </button>
      </div>
      <img src={splashImage} alt="" />
    </div>
  );

export default Splash;

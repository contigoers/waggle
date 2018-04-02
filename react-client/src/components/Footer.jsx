import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const Footer = () =>
  (
    <CSSTransitionGroup
      transitionName="fade-appear"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div className="footer">
        Developed and Designed by The Greatest Group There Ever Was
      </div>
    </CSSTransitionGroup>
  );

export default Footer;

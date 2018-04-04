import React from 'react';
import { Icon } from 'antd';
import { scroller } from 'react-scroll';
import { CSSTransitionGroup } from 'react-transition-group';
import splashImage from '../assets/dog-video.mp4';

class Splash extends React.Component {
  static scrollToNav() {
    scroller.scrollTo('nav-bar', {
      duration: 800,
      delay: 100,
      smooth: true,
    });
  }

  constructor() {
    super();
    this.state = {
      count: 1,
      isHovered: false,
      dogNicknames: ['good boy', 'buddy', 'good girl', 'bubba', 'best friend', 'soul mate'],
      currentName: 'best friend',
      video: splashImage,
    };
    this.handleHover = this.handleHover.bind(this);
  }

  componentWillMount() {
    const cycle = setInterval(() => {
      this.setState({
        currentName: this.getNextName(this.state.count),
      });
      if (this.state.count !== this.state.dogNicknames.length - 1) {
        this.setState({
          count: (this.state.count = this.state.count + 1),
        });
      } else {
        this.setState({ count: 0 });
      }
    }, 1500);
    this.setState({
      cycleIntervalId: cycle,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.cycleIntervalId);
  }

  getNextName() {
    return this.state.dogNicknames[this.state.count];
  }

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered,
    });
  }

  render() {
    const iconClass = this.state.isHovered
      ? 'down-icon animated infinite rubberBand'
      : 'down-icon';
    return (
      <CSSTransitionGroup
        transitionName="fade-appear"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="splash">
          <div className="splash-items">
            <div className="company-name splash-item">waggl</div>
            <button
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleHover}
              className="adopt-button splash-item"
              onClick={() => {
                Splash.scrollToNav();
              }}
            >
              Find your new <div className="dog-names animated infinite">{this.state.currentName}</div>
              <Icon className={iconClass} type="down" />
            </button>
          </div>
          <div className="splash-media">
            <video autoPlay loop>
              <source src={this.state.video} type="video/mp4" />
            </video>
            <div className="pixel-overlay" />
            <div className="background-overlay" />
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default Splash;

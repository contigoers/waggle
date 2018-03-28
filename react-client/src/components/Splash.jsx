import React from 'react';
import { Icon } from 'antd';
import { scroller } from 'react-scroll';
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
      dogNicknames: ['good boy', 'buddy', 'good girl', 'bubba', 'best friend'],
      currentName: 'best friend',
    };
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     currentName: this.getNextName(this.state.count),
    //   });
    //   if (this.state.count !== this.state.dogNicknames.length - 1) {
    //     this.setState({
    //       count: (this.state.count = this.state.count + 1),
    //     });
    //   } else {
    //     this.setState({ count: 0 });
    //   }
    // }, 1500);
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
    const dogNameClass = this.state.isHovered
      ? 'dog-names animated infinite'
      : 'dog-names';
    return (
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
            Find your new <div className={dogNameClass}>{this.state.currentName}</div>
            <Icon className={iconClass} type="down" />
          </button>
        </div>
        <div className="splash-media">
          <video autoPlay loop>
            <source src={splashImage} type="video/mp4" />
          </video>
          <div className="pixel-overlay" />
          <div className="background-overlay" />
        </div>
      </div>
    );
  }
}

export default Splash;

// <img src={splashImage} alt="" />

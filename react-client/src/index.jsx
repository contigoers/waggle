import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'antd';
import { scroller } from 'react-scroll';

import './styles.scss';

import List from './components/List';
import Test from './components/Test';

import reducers from './reducers';

class App extends Component {
  static scrollToNav() {
    scroller.scrollTo('nav-bar', {
      duration: 800,
      delay: 100,
      smooth: true,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pic: '',
    };
  }

  componentDidMount() {
    this.getRandomPic();
  }

  getRandomPic() {
    axios.get('/picture')
      .then((response) => {
        setTimeout(() => {
          this.setState({
            pic: response.data,
          });
        }, 700);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div className="body">
        <div className="splash">
          <div className="splash-items">
            <div className="company-name splash-item">
              waggl
            </div>
            <button className="adopt-button splash-item" onClick={() => { App.scrollToNav(); }} >
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
        <div className="content">
          <div className="content-div">
            {
              this.state.pic.length ?
                <div>
                  <Test />
                  <List items={this.state.items} />
                  <img src="http://i.imgur.com/3jf51.jpg" alt="issa dog" />
                  <img src={this.state.pic} alt="Loading..." />
                </div> :
                <Icon type="loading" className="loader" spin />
            }
          </div>
        </div>
        <div className="footer">
          Developed and Designed by The Greatest Group There Ever Was
        </div>
      </div>
    );
  }
}

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('app'),
);

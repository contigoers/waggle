import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import { Icon } from 'antd';
import './styles.scss';
import List from './components/List';
import Test from './components/Test';
import reducers from './reducers';

class App extends React.Component {
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
    setTimeout(() => {
      axios.get('/picture')
        .then((response) => {
          this.setState({
            pic: response.data,
          });
        })
        .catch((error) => {
          console.log('error', error);
        });
    }, 800);
  }

  render() {
    return (
      <div className="body">
        <div className="nav-bar">
          <div className="logo-div nav-item">
            <img src="https://i.imgur.com/YiJcCHt.png" alt="waggle-logo" />
          </div>
          <div className="home-div nav-item">
            Home
          </div>
          <div className="find-dog-div nav-item">
            Find My Dog
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
                  <img src="http://i.imgur.com/3jf51.jpg" alt="it's a dog" />
                  <img src={this.state.pic} alt="Loading..." />
                </div> :
                <Icon type="loading" className="loader" style={{ fontSize: 40 }} spin />
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
    <App />
  </Provider>
  , document.getElementById('app'),
);

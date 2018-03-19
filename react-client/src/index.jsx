import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import { Icon } from 'antd';
import { scroller } from 'react-scroll';
import './styles.scss';
import List from './components/List';
import Test from './components/Test';
import reducers from './reducers';
import NavBar from './components/NavBar';

class App extends React.Component {
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
        <NavBar />
        <div className="content">
          <div className="content-divs">
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
          <div className="content-divs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum odio urna,
            id faucibus arcu egestas id. In viverra laoreet purus vitae porttitor. Etiam nisl dui,
            commodo non aliquet in, tincidunt eget massa. Sed dictum dui sit amet sem ultrices
            egestas. Cras quis est cursus, ullamcorper enim eget, facilisis quam. Aliquam semper
            nunc ac consequat ultrices. Ut congue magna enim. Maecenas elit dui, lacinia vitae orci
            in, dapibus finibus orci. Integer aliquam nisi nec urna interdum, et pharetra dolor
            gravida. Proin eu leo pharetra, euismod lorem quis, auctor erat.
          </div>
          <div className="content-divs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum odio urna,
            id faucibus arcu egestas id. In viverra laoreet purus vitae porttitor. Etiam nisl dui,
            commodo non aliquet in, tincidunt eget massa. Sed dictum dui sit amet sem ultrices
            egestas. Cras quis est cursus, ullamcorper enim eget, facilisis quam. Aliquam semper
            nunc ac consequat ultrices. Ut congue magna enim. Maecenas elit dui, lacinia vitae orci
            in, dapibus finibus orci. Integer aliquam nisi nec urna interdum, et pharetra dolor
            gravida. Proin eu leo pharetra, euismod lorem quis, auctor erat.
          </div>
          <div className="content-divs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum odio urna,
            id faucibus arcu egestas id. In viverra laoreet purus vitae porttitor. Etiam nisl dui,
            commodo non aliquet in, tincidunt eget massa. Sed dictum dui sit amet sem ultrices
            egestas. Cras quis est cursus, ullamcorper enim eget, facilisis quam. Aliquam semper
            nunc ac consequat ultrices. Ut congue magna enim. Maecenas elit dui, lacinia vitae orci
            in, dapibus finibus orci. Integer aliquam nisi nec urna interdum, et pharetra dolor
            gravida. Proin eu leo pharetra, euismod lorem quis, auctor erat.          
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './styles.scss';
import './search-styles.scss';

import reducers from './reducers';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Search from './components/Search';
import Footer from './components/Footer';
import CreateDogForm from './components/CreateDogForm';
import DogProfile from './components/DogProfile';
import SearchResults from './components/SearchResults';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(promise)));
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Splash} />
        <NavBar />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/search" component={Search} />
          <Route path="/create" component={CreateDogForm} />
          <Route path="/sample" component={DogProfile} />
          <Route path="/searchresults" component={SearchResults} />
          <Route path="/" component={Landing} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>

  </Provider>
  , document.getElementById('app'),
);

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
import Search from './components/Search';
import Footer from './components/Footer';
import CreateDogForm from './components/CreateDogForm';
import DogProfile from './components/DogProfile';
import SearchResults from './components/SearchResults';
import OrgProfile from './components/OrgProfile';

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
          <Route path="/search" component={Search} />
          <Route path="/create" component={CreateDogForm} />
          <Route path="/org" component={OrgProfile} />
          <Route path="/searchResults" component={SearchResults} />
          <Route path="/dog/:id" component={DogProfile} />
          <Route path="/" component={Landing} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>

  </Provider>
  , document.getElementById('app'),
);

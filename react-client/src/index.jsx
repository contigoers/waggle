import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import { CSSTransitionGroup } from 'react-transition-group';

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
import UserProfile from './components/UserProfile';
import ScrollToTop from './components/ScrollToTop';
import About from './components/About';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(promise)));
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <div>
          <Route exact path="/" component={Splash} />
          <CSSTransitionGroup
            transitionName="search-page-fade"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <NavBar />
          </CSSTransitionGroup>
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/create" component={CreateDogForm} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/searchResults" component={SearchResults} />
            <Route path="/dog/:id" component={DogProfile} />
            <Route path="/about" component={About} />
            <Route path="/" component={Landing} />
          </Switch>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>

  </Provider>
  , document.getElementById('app'),
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './styles.scss';

import reducers from './reducers';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Search from './components/Search';
import Footer from './components/Footer';
import CreateDogForm from './components/CreateDogForm';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <div>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Splash} />
          <NavBar />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/search" component={Search} />
            <Route path="/create" component={CreateDogForm} />
            <Route path="/" component={Landing} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
    <CreateDogForm />
  </div>
  , document.getElementById('app'),
);

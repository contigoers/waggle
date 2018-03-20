import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles.scss';

import reducers from './reducers';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Search from './components/Search';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('app'),
);

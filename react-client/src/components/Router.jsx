import React from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './NavBar';
import Splash from './Splash';
import Landing from './Landing';
import Search from './Search';
import Footer from './Footer';
import CreateDogForm from './CreateDogForm';
import DogProfile from './DogProfile';
import SearchResults from './SearchResults';
import UserProfile from './UserProfile';
import ScrollToTop from './ScrollToTop';
import About from './About';
import ResetPass from './ResetPass';

const Router = props => (
  <BrowserRouter>
    <Provider store={props.store}>
      <React.Fragment>
        <ScrollToTop>
          <Route exact path="/" component={Splash} />
          <NavBar />
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/create" render={() => (props.user ? <CreateDogForm /> : <Redirect to="/" />)} />
            <Route path="/profile" render={() => (props.user ? <UserProfile /> : <Redirect to="/" />)} />
            <Route path="/searchResults" component={SearchResults} />
            <Route path="/dog/:id" component={DogProfile} />
            <Route path="/about" component={About} />
            <Route path="/resetpass/:token" component={ResetPass} />
            <Route path="/" component={Landing} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </React.Fragment>
    </Provider>
  </BrowserRouter>
);

const mapStateToProps = state => (
  {
    user: state.storeUser.user,
  }
);

export default connect(mapStateToProps, null)(Router);

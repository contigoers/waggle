import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

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
import NotFound from './404';
import Callback from './Callback';

import { storeUserId } from '../actions/loginActions';
import { getFavorites } from '../actions/searchActions';

class Router extends Component {
  constructor(props) {
    super(props);

    if (!this.props.user) {
      axios.get('/login/check')
        .then(({ data }) => {
          if (data.user) {
            this.props.storeUserId({ user: data.user });
            if (data.user.adopterId) this.props.getFavorites(data.user.adopterId);
          }
        });
    }
  }

  render() {
    const { user, store } = this.props;
    return (
      <BrowserRouter>
        <Provider store={store}>
          <React.Fragment>
            <ScrollToTop>
              <Route exact path="/" render={() => !user && <Splash />} />
              <NavBar />
              <Switch>
                <Route path="/auth" component={Callback} />
                <Route path="/search" component={Search} />
                <Route path="/create" render={() => (user && !user.adopterId ? <CreateDogForm /> : <Redirect to="/" />)} />
                <Route path="/profile" render={() => (!user ? <Redirect to="/" /> : user.email ? <UserProfile /> : <Redirect to="/auth" />)} />
                <Route path="/searchResults" component={SearchResults} />
                <Route path="/dog/:id" component={DogProfile} />
                <Route path="/about" component={About} />
                <Route path="/resetpass/:token" component={ResetPass} />
                <Route exact path="/" component={Landing} />
                <Route path="/" component={NotFound} />
              </Switch>
              <Footer />
            </ScrollToTop>
          </React.Fragment>
        </Provider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.storeUser.user,
  }
);

export default connect(mapStateToProps, { getFavorites, storeUserId })(Router);

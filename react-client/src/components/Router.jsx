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

import { storeUserId } from '../actions/loginActions';
import { getFavorites } from '../actions/searchActions';

class Router extends Component {
  constructor(props) {
    super(props);

    this.state = { go: false };
    if (!this.props.user) {
      axios.get('/login/check')
        .then(({ data }) => {
          if (data.user) {
            this.props.storeUserId({ user: data.user });
            if (data.user.adopterId) this.props.getFavorites(data.user.adopterId);
            this.setState({ go: true });
          }
        });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={this.props.store}>
          <React.Fragment>
            {this.state.go &&
            <ScrollToTop>
              <Route exact path="/" render={() => !this.props.user && <Splash />} />
              <NavBar />
              <Switch>
                <Route path="/search" component={Search} />
                <Route path="/create" render={() => (this.props.user ? <CreateDogForm /> : <Redirect to="/" />)} />
                <Route path="/profile" render={() => (this.props.user ? <UserProfile /> : <Redirect to="/" />)} />
                <Route path="/searchResults" component={SearchResults} />
                <Route path="/dog/:id" component={DogProfile} />
                <Route path="/about" component={About} />
                <Route path="/resetpass/:token" component={ResetPass} />
                <Route exact path="/" component={Landing} />
                <Route path="/" component={NotFound} />
              </Switch>
              <Footer />
            </ScrollToTop>}
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

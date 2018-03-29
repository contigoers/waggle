import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import Logo from '../assets/logo.png';
import WrappedLoginForm from './LoginForm';
import { toggleLoginModal, storeUserId } from '../actions/loginActions';
import { toggleRegistrationModal } from '../actions/registrationActions';
import RegistrationLandingModal from './RegistrationLandingModal';


const NavBar = (props) => {
  const logout = () => {
    axios.post('/logout').then((response) => {
      console.log(response);
      props.storeUserId({ user: null });
      props.history.push('/');
    });
  };

  return (
    <div className="nav-bar-container">
      <div name="nav-bar" className="nav-bar">
        <div className="logo-div nav-item">
          <img src={Logo} alt="waggl-logo" />
        </div>
        <div className="home-div nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </div>
        <div className="find-dog-div nav-item">
          <Link className="nav-link" to="/search">Find A Dog</Link>
        </div>
        <div className="about-div nav-item">
          <Link className="nav-link" to="/about">About Us</Link>
        </div>
        {props.user && props.user.org_id > 1 &&
        <div className="create-dog nav-item">
          <Link className="nav-link" to="/create">Add a Dog</Link>
        </div>
        }
        {props.user && props.user.org_id > 1 &&
        <div className="profile nav-item">
          <Link className="nav-link" to="/profile">Org Profile</Link>
        </div>
        }
        {props.user && props.user.org_id === 1 &&
        <div className="profile nav-item">
          <Link className="nav-link" to="/profile">Adopter Profile</Link>
        </div>
        }
        {props.user ?
          <div className="logout nav-item">
            <Button className="logout-button user-button" onClick={() => { logout(); }} size="large" type="primary" icon="idcard">Log Out</Button>
          </div> :
          <div className="login nav-item">
            <Button className="login-button user-button" onClick={props.toggleLoginModal} size="large" type="primary" icon="idcard">Log In</Button>
          </div>
        }
        {!props.user &&
          <div className="signup nav-item">
            <Button className="signup-button user-button" onClick={props.toggleRegistrationModal} size="large" type="primary" icon="solution">Sign Up</Button>
          </div>
        }
      </div>
      <WrappedLoginForm />
      <RegistrationLandingModal />
    </div>
  );
};

const mapStateToProps = state => (
  {
    visible: state.loginModal.visible,
    landing: state.registrationModal.landing,
    user: state.storeUser.user,
  }
);

export default connect(
  mapStateToProps,
  { toggleLoginModal, toggleRegistrationModal, storeUserId },
)(withRouter(NavBar));

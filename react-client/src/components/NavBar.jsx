import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import Logo from '../assets/logo.png';
import WrappedLoginForm from './LoginForm';
import { toggleLoginModal } from '../actions/loginActions';
import { toggleRegistrationModal } from '../actions/registrationActions';
import RegistrationLandingModal from './RegistrationLandingModal';

const NavBar = props =>
  (
    <div>
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
        <div className="create-dog nav-item">
          <Link className="nav-link" to="/create">Add a Dog</Link>
        </div>
        <div className="sample-profile nav-item">
          <Link className="nav-link" to="/sample">Sample Profile</Link>
        </div>
        <div className="login nav-item">
          <Button className="login-button" onClick={props.toggleLoginModal} size="large" type="primary" icon="idcard">Log In</Button>
        </div>
        <div className="signup nav-item">
          <Button className="signup-button" onClick={props.toggleRegistrationModal} size="large" type="primary">Sign Up</Button>
        </div>
      </div>
      <WrappedLoginForm />
      <RegistrationLandingModal />
    </div>
  );

const mapStateToProps = state => (
  {
    visible: state.loginModal.visible,
    landing: state.registrationModal.landing,
  }
);

export default connect(mapStateToProps, { toggleLoginModal, toggleRegistrationModal })(NavBar);

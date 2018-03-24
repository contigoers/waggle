import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import Logo from '../assets/logo.png';
import WrappedLoginForm from './LoginForm';
import { toggleLoginModal } from '../actions/loginActions';

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
        <div className="signup-div nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
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
        <div className="org-profile nav-item">
          <Link className="nav-link" to="/org">Org Profile</Link>
        </div>

        <div className="login nav-item">
          <Button className="login-button" onClick={props.toggleLoginModal} size="large" type="primary" icon="idcard">Log In</Button>
        </div>
      </div>
      <WrappedLoginForm />
    </div>
  );

const mapStateToProps = ({ loginModal: { visible } }) => (
  {
    visible,
  }
);

export default connect(mapStateToProps, { toggleLoginModal })(NavBar);

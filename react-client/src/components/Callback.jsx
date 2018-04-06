import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Callback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: !!this.props.user.email,
    };
  }

  render() {
    if (this.state.redirect) return <Redirect to="/profile" />;

    return (
      <div>We need more info.</div>
    );
  }
}

const mapStateToProps = state => ({ user: state.storeUser.user });

export default connect(mapStateToProps, null)(Callback);

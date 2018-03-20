import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Row,
  Col,
  Modal,
} from 'antd';

import AdopterRegistration from './AdopterRegistration';
import OrgRegistration from './OrgRegistration';

import { toggleRegistrationModal } from '../actions/registrationActions';

class Login extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col>
            I want to register as:
          </Col>
        </Row>
        <Row justify="center">
          <Button
            onClick={this.props.toggleRegistrationModal}
            size="large"
            id="adopter"
            type="primary"
          >an adopter
          </Button>
          <Button
            onClick={this.props.toggleRegistrationModal}
            size="large"
            id="org"
            type="primary"
          >an organization
          </Button>
        </Row>
        <Modal
          id="adopter"
          title="Register as an Adopter"
          visible={this.props.adopter}
          onCancel={this.props.toggleRegistrationModal}
          footer={[
            <Button key="back" onClick={this.props.toggleRegistrationModal}>Return</Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <AdopterRegistration />
        </Modal>
        <Modal
          id="org"
          title="Register as an Organization"
          visible={this.props.org}
          onCancel={this.props.toggleRegistrationModal}
          footer={[
            <Button key="back" onClick={this.props.toggleRegistrationModal}>Return</Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <OrgRegistration />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ registrationModal: { adopter, current, org } }) => (
  {
    org,
    adopter,
    current,
  }
);

export default connect(mapStateToProps, { toggleRegistrationModal })(Login);

// sign up w/ facebook option

// all users
//   username : string
//   password : string
//   password confirm : string
//   email address : string (verify?)
//   street address : string
//   city : string
//   zipcode : number
//   phone # : numeric?
//   organization/adopter: drop down

// render on adopter signup
//   name : string
//   has pets : checkbox boolean
//   home type : drop down (house, apartment, other)

// render on organization signup
//   org name

import React, { Component } from 'react';
import {
  Button,
  Row,
  Col,
  Modal,
} from 'antd';

import AdopterRegistration from './AdopterRegistration';
import OrgRegistration from './OrgRegistration';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      org: false,
      adopter: false,
      current: undefined,
    };

    this.toggleRegistration = this.toggleRegistration.bind(this);
  }

  toggleRegistration({ target: { id } }) {
    if (id) {
      this.setState({
        [id]: true,
        current: [id],
      });
    } else {
      this.setState({
        [this.state.current]: false,
        current: undefined,
      });
    }
  }

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
            onClick={this.toggleRegistration}
            size="large"
            id="adopter"
            type="primary"
          >an adopter
          </Button>
          <Button
            onClick={this.toggleRegistration}
            size="large"
            id="org"
            type="primary"
          >an organization
          </Button>
        </Row>
        <Modal
          id="adopter"
          title="Register as an Adopter"
          visible={this.state.adopter}
          onCancel={this.toggleRegistration}
          footer={[
            <Button key="back" onClick={this.toggleRegistration}>Return</Button>,
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
          visible={this.state.org}
          onCancel={this.toggleRegistration}
          footer={[
            <Button key="back" onClick={this.toggleRegistration}>Return</Button>,
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

export default Login;

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

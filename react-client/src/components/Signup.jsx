import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Row,
  Col,
} from 'antd';

import WrappedAdopterRegistration from './AdopterRegistration';
import WrappedOrgRegistration from './OrgRegistration';

import { toggleRegistrationModal } from '../actions/registrationActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form;

    if (e.target.id === 'org') {
      ({ form } = this.orgRef.props);
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of org form: ', values);
          form.resetFields();
          this.props.toggleRegistrationModal({ target: {} });
        }
      });
    } else {
      ({ form } = this.adopterRef.props);
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of adopter form: ', values);
          form.resetFields();
          this.props.toggleRegistrationModal({ target: {} });
        }
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
        <WrappedAdopterRegistration
          wrappedComponentRef={(adopterRef) => { this.adopterRef = adopterRef; }}
          onSubmit={this.handleSubmit}
        />
        <WrappedOrgRegistration
          wrappedComponentRef={(orgRef) => { this.orgRef = orgRef; }}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ registrationModal: { adopter, org } }) => (
  {
    org,
    adopter,
  }
);

export default connect(mapStateToProps, { toggleRegistrationModal })(Login);

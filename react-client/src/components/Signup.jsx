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
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form;
    const { target: { id } } = e;

    if (id === 'org') {
      ({ form } = this.orgRef.props);
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of org form: ', values);
          form.resetFields();
          this.props.toggleRegistrationModal(id);
        }
      });
    } else {
      ({ form } = this.adopterRef.props);
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of adopter form: ', values);
          form.resetFields();
          this.props.toggleRegistrationModal(id);
        }
      });
    }
  }

  toggleModal(e) {
    this.props.toggleRegistrationModal(e.target.id);
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
            onClick={this.toggleModal}
            size="large"
            id="adopter"
            type="primary"
          >an adopter
          </Button>
          <Button
            onClick={this.toggleModal}
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

export default connect(null, { toggleRegistrationModal })(Login);

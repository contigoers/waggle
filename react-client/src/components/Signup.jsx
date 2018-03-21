import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Row,
  Col,
  Modal,
} from 'antd';

import WrappedAdopterRegistration from './AdopterRegistration';
import OrgRegistration from './OrgRegistration';

import { toggleRegistrationModal } from '../actions/registrationActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        form.resetFields();
        this.props.toggleRegistrationModal({ target: {} });
      }
    });
  }

  saveFormRef(formRef) {
    this.formRef = formRef;
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
          wrappedComponentRef={this.saveFormRef}
          onSubmit={this.handleSubmit}
        />
        <Modal
          id="org"
          title="Register as an Organization"
          visible={this.props.org}
          onCancel={this.props.toggleRegistrationModal}
          footer={[
            <Button key="back" onClick={this.props.toggleRegistrationModal}>Cancel</Button>,
            <Button key="register" type="primary" onClick={this.handleSubmit}>
              Register
            </Button>,
          ]}
        >
          <OrgRegistration />
        </Modal>
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

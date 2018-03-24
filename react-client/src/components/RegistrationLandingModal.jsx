import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import axios from 'axios';

import { toggleRegistrationModal, updateModalView } from '../actions/registrationActions';
import WrappedAdopterRegistration from './AdopterRegistration';
import WrappedOrgRegistration from './OrgRegistration';

class LandingModal extends Component {
  constructor(props) {
    super(props);

    this.handleOrgSubmit = this.handleOrgSubmit.bind(this);
    this.handleAdopterSubmit = this.handleAdopterSubmit.bind(this);
  }

  handleOrgSubmit(e) {
    e.preventDefault();
    const { form } = this.orgRef.props;
    form.validateFieldsAndScroll((err, values) => {
      this.orgRef.setState({ phoneDirty: true });
      if (!err && this.state.numberIsValid) {
        axios.post('/register', values);
        this.orgRef.setState({ phoneDirty: false });
        form.resetFields();
        this.toggleModal();
      }
    });
  }

  handleAdopterSubmit(e) {
    e.preventDefault();
    const { form } = this.adopterRef.props;
    form.validateFieldsAndScroll((err, values) => {
      this.adopterRef.setState({ phoneDirty: true });
      if (!err && this.state.numberIsValid) {
        axios.post('/register', values);
        this.adopterRef.setState({ phoneDirty: false });
        form.resetFields();
        this.toggleModal();
      }
    });
  }

  render() {
    const { adopter, org, landing } = this.props;

    return (
      <Modal
        id="adopter"
        title={`Register${(adopter && ' as an Adopter') || (org && ' as an Organization') || ''}`}
        visible={landing}
        onCancel={this.props.toggleRegistrationModal}
        footer={(!adopter && !org && [
          <Button key="back" onClick={this.props.toggleRegistrationModal}>Cancel</Button>,
          ]) || (!adopter && org && [
            <Button key="back" onClick={this.props.toggleRegistrationModal}>Cancel</Button>,
            <Button id="org" key="register" type="primary" onClick={this.handleOrgSubmit}>Register</Button>,
          ]) || (adopter && !org && [
            <Button key="back" onClick={this.props.toggleRegistrationModal}>Cancel</Button>,
            <Button id="adopter" key="register" type="primary" onClick={this.handleAdopterSubmit}>Register</Button>,
          ])}
      >

        {!org && !adopter && (
          <div>
            <div>I would like to register as:</div>
            <Button onClick={() => this.props.updateModalView('adopter')}>an adopter</Button>
            <Button onClick={() => this.props.updateModalView('org')}>an organization</Button>
          </div>
        )}
        {org && !adopter && (
          <WrappedOrgRegistration
            wrappedComponentRef={(orgRef) => { this.orgRef = orgRef; }}
            onSubmit={this.handleSubmit}
          />
        )}
        {adopter && !org && (
          <WrappedAdopterRegistration
            wrappedComponentRef={(adopterRef) => { this.adopterRef = adopterRef; }}
            onSubmit={this.handleSubmit}
          />
        )}

      </Modal>
    );
  }
}

const mapStateToProps = ({ registrationModal: { landing, org, adopter } }) => (
  {
    landing,
    org,
    adopter,
  }
);

export default connect(mapStateToProps, { toggleRegistrationModal, updateModalView })(LandingModal);


/*
<Modal
  id="adopter"
  title="Register as an Adopter"
  visible={this.props.adopter}
  onCancel={this.toggleModal}
  footer={[
    <Button key="back" onClick={this.toggleModal}>Cancel</Button>,
    <Button id="adopter" key="register" type="primary" onClick={this.handleSubmit}>
      Register
    </Button>,
  ]}
>
*/

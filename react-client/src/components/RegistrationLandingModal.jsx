import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import axios from 'axios';

import { storeUserId } from '../actions/loginActions';
import { toggleRegistrationModal, updateModalView } from '../actions/registrationActions';
import WrappedAdopterRegistration from './AdopterRegistration';
import WrappedOrgRegistration from './OrgRegistration';

class LandingModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.props.toggleRegistrationModal.bind(this);
    this.storeUser = this.props.storeUserId.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const ref = e.target.id === 'org' ? this.orgRef : this.adopterRef;
    ref.props.form.validateFieldsAndScroll((err, values) => {
      const newValues = {
        ...values,
        type: e.target.id === 'org' ? 'organization' : 'adopter',
      };
      ref.setState({ phoneDirty: true });
      if (!err && ref.state.numberIsValid) {
        axios.post('/register', newValues).then((response) => {
          ref.setState({ phoneDirty: false });
          this.toggleModal();
          this.storeUser({ user: response.data.user });
          ref.props.form.resetFields();
        });
      }
    });
  }

  render() {
    const { adopter, org, landing } = this.props;

    return (
      <Modal
        id="adopter"
        width="40%"
        title={`Register${(adopter && ' as an Adopter') || (org && ' as an Organization') || ''}`}
        visible={landing}
        onCancel={this.props.toggleRegistrationModal}
        footer={(!adopter && !org && [
          <Button key="back" onClick={this.props.toggleRegistrationModal}>Cancel</Button>,
          ]) || ((adopter || org) && [
            <Button key="back" onClick={this.props.toggleRegistrationModal}>Cancel</Button>,
            <Button id={org ? 'org' : 'adopter'} key="register" type="primary" onClick={this.handleSubmit}>Register</Button>,
          ])}
      >

        {!org && !adopter && (
          <div className="type-button">
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

export default
connect(mapStateToProps, { toggleRegistrationModal, updateModalView, storeUserId })(LandingModal);

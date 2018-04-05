import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, message } from 'antd';
import { CSSTransitionGroup } from 'react-transition-group';
import axios from 'axios';

import { storeUserId } from '../actions/loginActions';
import { toggleRegistrationModal, updateModalView } from '../actions/registrationActions';
import WrappedAdopterRegistration from './AdopterRegistration';
import WrappedOrgRegistration from './OrgRegistration';

class LandingModal extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
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
        this.setState({ loading: true });
        axios.post('/register', newValues)
          .then((response) => {
            this.setState({ loading: false });
            ref.setState({ phoneDirty: false });
            this.toggleModal();
            this.storeUser({ user: response.data.user });
            ref.props.form.resetFields();
          })
          .catch((error) => {
            this.setState({ loading: false });
            const { status } = error.response;
            const info = error.response.data;

            if (status === 500 || info === 'error at creation') {
              message.error('Sorry, an unknown error occurred.', 5);
            } else if (status === 418 && info === 'email taken') {
              message.error('Sorry, this email is already in use.', 5);
            } else if (status === 418 && info === 'username taken') {
              message.error('Sorry, this username is already in use.', 5);
            } else if (status === 418 && info === 'username and email taken') {
              message.error('Sorry, this username and email are already in use.', 5);
            } else if (status === 418 && info === 'org name taken') {
              message.error('Sorry, this organization name already in use.', 5);
            }
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
            <Button
              id={org ? 'org' : 'adopter'}
              key="register"
              type="primary"
              onClick={this.handleSubmit}
              loading={this.state.loading}
            >Register
            </Button>,
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
          <CSSTransitionGroup
            transitionName="fade-appear"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <WrappedOrgRegistration
              wrappedComponentRef={(orgRef) => { this.orgRef = orgRef; }}
              onSubmit={this.handleSubmit}
            />
          </CSSTransitionGroup>
        )}
        {adopter && !org && (
          <CSSTransitionGroup
            transitionName="fade-appear"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <WrappedAdopterRegistration
              wrappedComponentRef={(adopterRef) => { this.adopterRef = adopterRef; }}
              onSubmit={this.handleSubmit}
            />
          </CSSTransitionGroup>
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

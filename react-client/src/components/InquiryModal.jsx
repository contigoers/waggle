import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import axios from 'axios';

import { toggleInquiryModal } from '../actions/messagingActions';
import InquiryForm from './InquiryForm';


class InquiryModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { id, results, user } = this.props;
    e.preventDefault();
    this.ref.props.form.validateFields((err, values) => {
      const body = {
        message: values.message,
        recipientId: results.dogs[id].org_id,
        senderId: user.id,
      };
      axios.post('/messages/post', body);
    });
  }

  render() {
    const {
      results,
      id,
      visible,
      user,
    } = this.props;

    return (
      <Modal
        id="inquiry"
        title={`Send a message about ${results.dogs[id].name}`}
        visible={visible}
        onCancel={this.props.toggleInquiryModal}
        footer={[
          <Button key="back" onClick={this.props.toggleInquiryModal}>Cancel</Button>,
          (user && <Button onClick={this.handleSubmit} key="submit" type="primary">Send</Button>),
        ]}
      >
        {(!user && 'Please log in to send a message.') ||
        <InquiryForm
          orgId={results.dogs[id].org_id}
          dogId={id}
          wrappedComponentRef={(ref) => { this.ref = ref; }}
        />}
      </Modal>
    );
  }
}

const mapStateToProps = ({ inquiryModal, storeUser, search }) => (
  {
    visible: inquiryModal.visible,
    user: storeUser.user,
    results: search.results,
  }
);

export default connect(mapStateToProps, { toggleInquiryModal })(InquiryModal);

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

import { toggleInquiryModal } from '../actions/messagingActions';


const InquiryModal = (props) => {
  console.log(props);

  return (
    <Modal
      id="inquiry"
      title={`Send a message about ${props.results.dogs[props.id].name}`}
      visible={props.visible}
      onCancel={props.toggleInquiryModal}
      footer={[
        <Button key="back" onClick={props.toggleInquiryModal}>Cancel</Button>,
      ]}
    >
      {!props.user && 'Please log in to send a message.'}
    </Modal>
  );
};

const mapStateToProps = ({ inquiryModal, storeUser, search }) => (
  {
    visible: inquiryModal.visible,
    user: storeUser.user,
    results: search.results,
  }
);

export default connect(mapStateToProps, { toggleInquiryModal })(InquiryModal);

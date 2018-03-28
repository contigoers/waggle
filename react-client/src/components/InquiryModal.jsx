import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

import { toggleInquiryModal } from '../actions/messagingActions';


const InquiryModal = props => (
  <Modal
    id="inquiry"
    title={`Send a message about ${'DOG_NAME_HERE'}`}
    visible={props.visible}
    footer={[
      <Button key="back" onClick={props.toggleInquiryModal}>Cancel</Button>,
    ]}
  />
);

const mapStateToProps = ({ inquiryModal: { visible } }) => (
  {
    visible,
  }
);

export default connect(mapStateToProps, { toggleInquiryModal })(InquiryModal);

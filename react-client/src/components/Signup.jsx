import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Row,
  Col,
} from 'antd';

import WrappedAdopterRegistration from './AdopterRegistration';
import WrappedOrgRegistration from './OrgRegistration';

import { toggleRegistrationModal } from '../actions/registrationActions';

const Signup = props => (
  <div>
    <Row type="flex" justify="center">
      <Col>
        I want to register as:
      </Col>
    </Row>
    <Row justify="center">
      <Button
        onClick={e => props.toggleRegistrationModal(e.target.id)}
        size="large"
        id="adopter"
        type="primary"
      >an adopter
      </Button>
      <Button
        onClick={e => props.toggleRegistrationModal(e.target.id)}
        size="large"
        id="org"
        type="primary"
      >an organization
      </Button>
    </Row>
    <WrappedAdopterRegistration />
    <WrappedOrgRegistration />
  </div>
);

export default connect(null, { toggleRegistrationModal })(Signup);

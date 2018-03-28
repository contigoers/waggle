import React from 'react';
import { connect } from 'react-redux';
import { Col, Card, Divider, Icon } from 'antd';
import { toggleInquiryModal } from '../actions/messagingActions';

const OrgCard = (props) => {
  const { org } = props;
  console.log(org);
  const phone = `(${org.phone.slice(0, 3)}) ${org.phone.slice(3, 6)}-${org.phone.slice(6)}`;
  return (
    <Col>
      <Card
        actions={[
          <Icon type="message" />,
        ]}
      >
        <div style={{ fontWeight: 700 }}> PLACEHOLDER </div>
        {props.user && org.id === props.user.org_id &&
          <div>
            <span style={{ fontWeight: 600, fontSize: 16, marginLeft: 5 }} >
            Organization Profile
            </span>
            <Divider type="vertical" />
            <span style={{ color: '#00db19', fontWeight: 600, fontSize: 16 }} >
            Username: {props.user.username}
            </span>
          </div>
        }

        <Divider />

        <h2> Location </h2>

        <h3 style={{ marginLeft: 20 }}> Address </h3>
        <div style={{ marginLeft: 20 }}> {org.address} </div>
        <div style={{ marginLeft: 20 }}>
          {org.city}, {org.state} {org.zipcode}
        </div>

        <h2 style={{ marginTop: 20 }} > Contact Info </h2>

        <h3 style={{ marginLeft: 20 }}> Phone & E-mail </h3>
        <div style={{ marginLeft: 20 }} > {phone} </div>
        <div style={{ marginLeft: 20 }} > {org.email} </div>
      </Card>
    </Col>
  );
};

const mapStateToProps = ({ storeUser }) => (
  {
    user: storeUser.user,
  }
);

export default connect(mapStateToProps, { toggleInquiryModal })(OrgCard);

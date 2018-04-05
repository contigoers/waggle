import React from 'react';
import { connect } from 'react-redux';
import { Col, Card, Divider } from 'antd';

const OrgCard = (props) => {
  const user = props.org ? props.org : props.user;
  console.log(props);
  console.log(props.user);
  const phone = `(${user.phone.slice(0, 3)}) ${user.phone.slice(3, 6)}-${user.phone.slice(6)}`;
  return (
    <Col>
      <Card style={{ borderRadius: 2, boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.2)' }}>
        <h2 style={{ fontWeight: 700 }}> {user.name ? user.name : user.org_name} </h2>
        {props.user && !props.user.adopterId &&
          <div>
            <span style={{ fontWeight: 600, fontSize: 16, marginLeft: 5 }} >
            Organization Profile
            </span>
            <Divider type="vertical" />
            <span style={{ color: '#00db19', fontWeight: 600, fontSize: 16 }} >
            Username: {user.username}
            </span>
          </div>
        }

        {user.adopterId &&
          <div>
            <span style={{ fontWeight: 600, fontSize: 16, marginLeft: 5 }} >
            Adopter Profile
            </span>
            <Divider type="vertical" />
            <span style={{ color: '#00db19', fontWeight: 600, fontSize: 16 }} >
            Username: {user.username}
            </span>
          </div>
        }


        <Divider />

        <h2> Location </h2>

        <h3 style={{ marginLeft: 20 }}> Address </h3>
        <div style={{ marginLeft: 20 }}> {user.address} </div>
        <div style={{ marginLeft: 20 }}>
          {user.city}, {user.state} {user.zipcode}
        </div>

        <h2 style={{ marginTop: 20 }} > Contact Info </h2>

        <h3 style={{ marginLeft: 20 }}> Phone & E-mail </h3>
        <div style={{ marginLeft: 20 }} > {phone} </div>
        <div style={{ marginLeft: 20 }} > {user.email} </div>
      </Card>
    </Col>
  );
};

const mapStateToProps = ({ storeUser: { user } }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, null)(OrgCard);

import React from 'react';
import { Col, Row, Card, Divider } from 'antd';

const OrgCard = (props) => {
  const { org } = props;
  const phone = `(${org.phone.slice(0, 3)}) ${org.phone.slice(3, 6)}-${org.phone.slice(6)}`;
  return (
    <Row style={{ marginTop: 30, marginBottom: 30 }} >
      <Col span={15} offset={3} >
        <Card>
          <div style={{ fontWeight: 700 }}> PLACEHOLDER </div>
          <span style={{ fontWeight: 600, fontSize: 16, marginLeft: 5 }} >
    Organization Profile
          </span>
          <Divider type="vertical" />
          <span style={{ color: '#00db19', fontWeight: 600, fontSize: 16 }} >
    Username: {org.username}
          </span>

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
    </Row>
  );
};

export default OrgCard;

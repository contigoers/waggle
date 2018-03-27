import React from 'react';
import { Col, Card, Divider } from 'antd';

const OrgCard = (props) => {
  const { org } = props;
  const phone = `(${org.phone.slice(1, 4)}) ${org.phone.slice(4, 7)}-${org.phone.slice(7)}`;
  return (
    <Card>
      <Card.Meta title="Shelter Info" />
      <Divider />
      <h4> {org.name} </h4>
      <div style={{ marginTop: 10 }}> {props.org.address} </div>
      <div>
        {org.city}, {org.state}
      </div>
      <div> {org.zipcode} </div>
      <div style={{ marginTop: 10 }}> {phone} </div>
    </Card>
  );
};

export default OrgCard;

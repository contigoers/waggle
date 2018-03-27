import React from 'react';
import { Card, Divider, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import SearchResult from './SearchResult';
import { getOrgDogs } from '../actions/searchActions';

class OrgProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      org: '',
    };
  }

  componentDidMount() {
    this.getOrgDogs();
  }

  getOrgDogs() {
    const { orgParams } = this.props;
    this.props.getOrgDogs({ params: orgParams });
  }

  render() {
    const { user } = this.props;
    const phone = `(${user.phone.slice(0, 3)}) ${user.phone.slice(3, 6)}-${user.phone.slice(6)}`;
    return (
      <div>
        <Row style={{ marginTop: 30, marginBottom: 30 }} >
          <Col span={15} offset={3} >
            <Card>
              <h1> {user.name} </h1>
              <span style={{ fontWeight: 600, fontSize: 16, marginLeft: 5 }} >
              Organization Profile
              </span>
              <Divider type="vertical" />
              <span style={{ fontWeight: 600, fontSize: 16 }} >
              Username: {user.username}
              </span>

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
        </Row>
        {!isEmpty(this.props.results) ? map(this.props.results, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}

      </div>
    );
  }
}


const mapStateToProps = ({ search, storeUser }) => (
  {
    results: search.results,
    user: storeUser.user,
    orgParams: {
      type: 'orgId',
      value: !storeUser.user ? 1 : storeUser.user.org_id,
    },
  }
);

const mapDispatchToProps = {
  getOrgDogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgProfile);

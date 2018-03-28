import React from 'react';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import { Row, Col } from 'antd';
import SearchResult from './DogPreviewCard';
import { getOrgDogs, getFavorites } from '../actions/searchActions';
import OrgCard from './OrgCard';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.user.org_id === 1 ? 'adopter' : 'org',
    };
  }

  componentDidMount() {
    console.log(this.state.type);
    if (this.state.type === 'org') {
      this.getOrgDogs();
    } else {
      this.getFavorites();
    }
  }

  getOrgDogs() {
    const { orgParams } = this.props;
    this.props.getOrgDogs({ params: orgParams });
  }

  getFavorites() {
    const { adopterParams } = this.props;
    this.props.getFavorites({ params: adopterParams });
  }

  render() {
    const { user } = this.props;
    const { results } = this.props;

    return (
      <div>
        <Row style={{ marginTop: 30 }} >
          <Col span={15} offset={3}>
            {this.state.type === 'org' &&
            <div>{!isEmpty(results.org) ? <OrgCard org={results.org} orgUser={user} /> : 'Loading...'} </div>
            }
            {this.state.type === 'adopter' &&
            <div>HALLO</div>
            }
          </Col>
        </Row>
        {this.state.type === 'org' &&
        <div>
          {!isEmpty(results.dogs) ? map(results.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}
        </div>
        }
        {this.state.type === 'adopter' &&
        <div>HALLO</div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ search, storeUser }) => (
  {
    results: search.results,
    favorites: search.favorites,
    user: storeUser.user,
    adopterParams: {
      adopterId: !storeUser.user ? null : storeUser.user.adopterId,
    },
    orgParams: {
      type: 'orgId',
      value: !storeUser.user ? 1 : storeUser.user.org_id,
    },
  }
);

const mapDispatchToProps = {
  getOrgDogs,
  getFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

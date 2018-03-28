import React from 'react';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import SearchResult from './DogPreviewCard';
import { getOrgDogs } from '../actions/searchActions';
import OrgCard from './OrgCard';

class OrgProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: 'PLACEHOLDER',
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
    const { results } = this.props;
    return (
      <div>
        <div>{!isEmpty(results.org) ? <OrgCard org={user} /> : 'Loading...'} </div>
        <div>
          {!isEmpty(results.dogs) ? map(results.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}
        </div>
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

import React from 'react';
import { connect } from 'react-redux';
import { map, isEmpty, mapKeys } from 'lodash';
import { Row, Col, Menu, Icon } from 'antd';

import SearchResult from './DogPreviewCard';
import OrgCard from './OrgCard';
import { getOrgDogs, getFavorites } from '../actions/searchActions';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.user.org_id === 1 ? 'adopter' : 'org',
      menuSelection: 'messages',
    };

    if (this.state.type === 'org') {
      this.getOrgDogs();
    } else {
      this.getFavorites();
    }

    this.updateMenu = this.updateMenu.bind(this);
  }

  getOrgDogs() {
    const { orgParams } = this.props;
    this.props.getOrgDogs({ params: orgParams });
  }

  getFavorites() {
    const { adopterParams } = this.props;
    this.props.getFavorites({ params: adopterParams });
  }

  updateMenu({ key }) {
    this.setState({
      menuSelection: key,
    });
  }

  render() {
    const { user } = this.props;
    const { results } = this.props;
    const { menuSelection } = this.state;
    const { favorites } = this.props;
    const faves = mapKeys(favorites.favoriteDogs, 'id');

    return (
      <div>
        <Menu mode="horizontal" selectedKeys={[menuSelection]} onClick={this.updateMenu}>
          <Menu.Item key="messages">
            <Icon type="mail" />Messages
          </Menu.Item>
          {this.state.type === 'adopter' &&
          <Menu.Item key="favorites">
            <Icon type="heart" />Favorites
          </Menu.Item>}
          {this.state.type === 'org' &&
          <Menu.Item key="dogs">
            <Icon type="bars" />Dogs
          </Menu.Item>}
        </Menu>
        <Row>
          {(menuSelection === 'favorites' || menuSelection === 'dogs') &&
          <div>
            <Row style={{ marginTop: 30 }} >
              <Col span={15} offset={3}>
                {this.state.type === 'org' &&
                <div>{!isEmpty(results.org) ? <OrgCard org={results.org} orgUser={user} /> : 'Loading...'} </div>
                }
                {this.state.type === 'adopter' &&
                <div>{!isEmpty(favorites.adopter) ? <OrgCard org={favorites.adopter} adopterUser={user} /> : 'Loading...'} </div>
                }
              </Col>
            </Row>
            {this.state.type === 'org' &&
            <div>
              {!isEmpty(results.dogs) ? map(results.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}
            </div>
            }
            {this.state.type === 'adopter' &&
            <div>
              {!isEmpty(faves) ? map(faves, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no favorite dogs'}
            </div>
            }
          </div>}
        </Row>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';
import { Row, Col, Menu, Icon, BackTop } from 'antd';
import { CSSTransitionGroup } from 'react-transition-group';

import SearchResult from './DogPreviewCard';
import MessagesTab from './MessagesTab';
import OrgCard from './OrgCard';
import { getOrgDogs, getFavorites, dogsSearch } from '../actions/searchActions';
import { getContacts, getMessages } from '../actions/messagingActions';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.user.org_id === 1 ? 'adopter' : 'org',
      menuSelection: 'profile',
    };

    if (this.state.type === 'org') {
      const value = this.props.user.org_id;
      this.getOrgDogs({ value });
    } else if (!Object.keys(this.props.favorites).length) {
      this.getFavorites();
    }
    this.props.getContacts(this.props.user.id, this.state.type);
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
    const { favoriteDogs, adopter } = this.props.favorites;

    return (
      <CSSTransitionGroup
        transitionName="fade-appear"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="user-profile-body">
          <Menu mode="horizontal" selectedKeys={[menuSelection]} onClick={this.updateMenu}>
            <Menu.Item key="profile">
              <Icon type="user" />Profile
            </Menu.Item>
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
            {menuSelection === 'profile' &&
            <div>
              {adopter || results.org ? (
                <Row style={{ marginTop: 30 }} >
                  <Col span={15} offset={3}>
                    {this.state.type === 'org' &&
                    <div>{Object.keys(results.org).length ? <OrgCard org={results.org} orgUser={user} /> : 'Loading...'} </div>}
                    {this.state.type === 'adopter' &&
                    <div>{Object.keys(adopter).length ? <OrgCard org={adopter} adopterUser={user} /> : 'Loading...'} </div>}
                  </Col>
                </Row>
              ) : (
                <div>Loading...</div>
              )}
            </div>}
            {(menuSelection === 'favorites' || menuSelection === 'dogs') &&
            <div>
              {this.state.type === 'org' &&
                <div className="search-results-grid" style={{ marginTop: 30 }}>
                  {Object.keys(results.dogs).length ? map(results.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}
                </div>}
              {this.state.type === 'adopter' &&
                <div className="search-results-grid" style={{ marginTop: 30 }}>
                  {Object.keys(favoriteDogs).length ? map(favoriteDogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no favorite dogs'}
                </div>}
              <BackTop />
            </div>}
            {(menuSelection === 'messages' &&
              <MessagesTab />
            )}
          </Row>
        </div>
      </CSSTransitionGroup>
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
  dogsSearch,
  getContacts,
  getMessages,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));

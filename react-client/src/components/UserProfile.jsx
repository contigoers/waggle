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

    const { user } = this.props;

    this.state = { menuSelection: 'profile' };

    if (this.props.location.state) {
      const { menuSelection } = this.props.location.state;
      this.state = { menuSelection };
    }

    if (!user.adopterId) {
      const value = this.props.user.org_id;
      this.getOrgDogs({ value });
      this.props.getContacts(this.props.user.id, 'org');
    } else if (!Object.keys(this.props.favorites).length) {
      this.getFavorites();
      this.props.getContacts(this.props.user.id, 'adopter');
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
    const { favoriteDogs } = this.props.favorites;

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
            {user.adopterId &&
            <Menu.Item key="favorites">
              <Icon type="heart" />Favorites
            </Menu.Item>}
            {!user.adopterId &&
            <Menu.Item key="dogs">
              <Icon type="bars" />Dogs
            </Menu.Item>}
          </Menu>
          <Row>
            {menuSelection === 'profile' &&
            <div>
              <Row style={{ marginTop: 30 }} >
                <Col span={15} offset={3}>
                  {!user.adopterId &&
                    <OrgCard />}
                  {user.adopterId &&
                    <OrgCard />}
                </Col>
              </Row>
            </div>}
            {(menuSelection === 'favorites' || menuSelection === 'dogs') &&
            <div>
              {!user.adopterId &&
                <div className="search-results-grid" style={{ marginTop: 30 }}>
                  {Object.keys(results.dogs).length ? map(results.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}
                </div>}
              {user.adopterId &&
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
      adopterId: storeUser.user.adopterId,
    },
    orgParams: {
      type: 'orgId',
      value: storeUser.user.org_id,
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

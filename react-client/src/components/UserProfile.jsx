import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';
import { Row, Col, Menu, Icon, BackTop, Divider } from 'antd';
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
      this.props.getOrgDogs(+user.org_id);
      this.props.getContacts(user.id, 'org');
    } else if (!Object.keys(this.props.favorites).length) {
      this.props.getFavorites(user.adopterId);
      this.props.getContacts(user.id, 'adopter');
    }

    this.updateMenu = this.updateMenu.bind(this);
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
        <div className="user-profile-body" style={{ backgroundColor: 'rgba(205, 83, 96, 0.05)' }}>
          <Menu mode="horizontal" selectedKeys={[menuSelection]} onClick={this.updateMenu} style={{ color: '#972036', backgroundColor: 'rgba(205, 83, 96, 0.2)' }}>
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
              <div>
                <div style={{ marginTop: 30, marginLeft: 75 }}>
                  {Object.keys(results.dogs).length ? `${Object.keys(results.dogs).length} Organization Dog(s)` : ''}
                </div>
                <Divider />
                <div className="search-results-grid" style={{ marginTop: 25, marginLeft: 35 }}>
                  {Object.keys(results.dogs).length ? map(results.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}
                </div>
              </div>}
              {user.adopterId &&
              <div>
                <div style={{ marginTop: 30, marginLeft: 75 }}>
                  {Object.keys(favoriteDogs).length ? `${Object.keys(favoriteDogs).length} Favorite Dog(s)` : ''}
                </div>
                <Divider />
                <div className="search-results-grid" style={{ marginTop: 25, marginLeft: 35 }}>
                  {Object.keys(favoriteDogs).length ? map(favoriteDogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no favorite dogs'}
                </div>
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

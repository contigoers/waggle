import React from 'react';
import { connect } from 'react-redux';
import { map, isEmpty, mapKeys } from 'lodash';
import { Row, Col, Menu, Icon, BackTop } from 'antd';
import { CSSTransitionGroup } from 'react-transition-group';

import SearchResult from './DogPreviewCard';
import MessagesTab from './MessagesTab';
import OrgCard from './OrgCard';
import { getOrgDogs, getFavorites, dogsSearch } from '../actions/searchActions';
import { getContacts, getMessages } from '../actions/messagingActions';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.user.org_id === 1 ? 'adopter' : 'org',
      menuSelection: null,
    };
    if (this.state.type === 'org') {
      this.getOrgDogs();
    } else if (isEmpty(this.props.favorites)) {
      this.getFavorites();
    }
    this.updateMenu = this.updateMenu.bind(this);
  }

  async componentWillMount() {
    await this.props.getContacts(this.props.user.id, this.state.type);
    if (this.props.location.state) {
      this.setState(this.props.location.state);
    } else {
      this.setState({ menuSelection: 'messages' });
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
      <CSSTransitionGroup
        transitionName="fade-appear"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="user-profile-body">
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
                <div className="search-results-grid" style={{ marginTop: 30 }}>
                  {!isEmpty(results.dogs) ? map(results.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no dogs'}
                </div>
              }
                {this.state.type === 'adopter' &&
                <div className="search-results-grid" style={{ marginTop: 30 }}>
                  {!isEmpty(faves) ? map(faves, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'You have no favorite dogs'}
                </div>
              }
              <BackTop />
            </div>}
            {(menuSelection === 'messages' &&
              <MessagesTab />
            )}
            {(!menuSelection === 'null' &&
              <div> Loading... </div>
            )}
          </Row>
        </div>
      </CSSTransitionGroup>
    );
  }
}

const mapStateToProps = ({
  search, storeUser, // fetchContacts, fetchMessages,
}) => (
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
    // messaging: {
    //   contacts: fetchContacts.contacts,
    //   messages: fetchMessages.messages,
    // },
  }
);

const mapDispatchToProps = {
  getOrgDogs,
  getFavorites,
  dogsSearch,
  getContacts,
  getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

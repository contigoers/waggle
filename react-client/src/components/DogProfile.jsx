import React from 'react';
import { Card, Divider, Row, Col, Icon, Button, message, Tooltip, Spin } from 'antd';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { startCase } from 'lodash';
import { CSSTransitionGroup } from 'react-transition-group';
import OrgCard from './OrgCard';
import InquiryModal from './InquiryModal';

import { addFavorite, removeFavorite, markAdopted, unmarkAdopted, searchDogById } from '../actions/searchActions';
import { toggleInquiryModal } from '../actions/messagingActions';
import { toggleEditModal } from '../actions/editActions';
import EditModal from './EditModal';

class DogProfile extends React.Component {
  constructor(props) {
    super(props);

    let prevPath = null;
    if (this.props.location.state) {
      ({ prevPath } = this.props.location.state);
    }
    this.state = {
      fetching: false,
      prevPath,
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleAdopted = this.toggleAdopted.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    if (!this.props.results.dogs) {
      this.setState({
        fetching: true,
      });
      await this.props.searchDogById(id);
      this.setState({
        fetching: false,
      });
    }
  }
  async toggleFavorite() {
    const { id } = this.props.match.params;
    const dog = this.props.results.dogs[id];
    const { favorites } = this.props;
    const { adopterId } = this.props.user;

    if (favorites[id]) {
      await this.props.removeFavorite({ adopterId, dogId: id });
    } else {
      await this.props.addFavorite({ adopterId, dogId: id });
    }

    message.info(!favorites[id] ?
      `${dog.name} added to favorites` :
      `${dog.name} removed from favorites`);
  }

  async toggleAdopted() {
    const { id } = this.props.match.params;
    const dog = this.props.results.dogs[id];
    const { adopted } = this.props.results.dogs[id];

    if (adopted) {
      await this.props.unmarkAdopted(id);
    } else {
      await this.props.markAdopted(id);
    }

    message.info(adopted ? `${dog.name} not adopted.` : `${dog.name} adopted!`);
  }

  goBack() {
    if (this.props.user && this.props.user.org_id > 1 && this.state.prevPath === '/profile') {
      this.props.history.push('/profile', { menuSelection: 'dogs' });
    } else if (this.props.user && this.props.user.org_id === 1 && this.state.prevPath === '/profile') {
      this.props.history.push('/profile', { menuSelection: 'favorites' });
    } else if (this.state.prevPath === '/search') {
      this.props.history.push('/search');
    }
  }

  render() {
    const { id } = this.props.match.params;
    if (this.state.fetching) {
      return (
        <div className="reset-pass">
          <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
        </div>
      );
    } else if (!this.state.fetching && !this.props.results.dogs[id]) {
      return (<Redirect to="/notfound" />);
    }
    const dog = this.props.results.dogs[id];
    const { favorites } = this.props;
    const { adopted } = dog;
    let photo;
    if (dog.photo) {
      photo = Buffer.from(dog.photo);
    } else {
      photo = 'https://i.redd.it/uwptaiy07xn01.jpg';
    }

    let org;

    if (!this.props.user || this.props.user.org_id !== dog.org_id) {
      org = this.props.results.orgs[dog.org_id];
    }

    let stage = startCase(dog.lifestage);
    if (dog.age) {
      stage += ` (age ${dog.age})`;
    }

    let temperament = '';
    if (dog.anxious && dog.aggressive) {
      temperament = 'anxiety, aggression';
    } else if (dog.anxious) {
      temperament = 'anxiety';
    } else if (dog.aggressive) {
      temperament = 'aggression';
    } else {
      temperament = 'none';
    }

    let specialNeeds = '';
    if (dog.diet && dog.medical) {
      specialNeeds = 'diet, medical';
    } else if (dog.diet) {
      specialNeeds = 'diet';
    } else if (dog.medical) {
      specialNeeds = 'medical';
    } else {
      specialNeeds = 'none';
    }

    const adoptIcon = adopted ?
      <Tooltip title={`Mark ${dog.name} not adopted`}><Icon style={{ color: 'rgba(205, 83, 96)' }} type="check-circle" onClick={this.toggleAdopted} /></Tooltip> :
      <Tooltip title={`Mark ${dog.name} adopted`}><Icon style={{ color: '#00db19' }} type="check-circle" onClick={this.toggleAdopted} /></Tooltip>;
    const favoriteIcon = !favorites ? // eslint-disable-line
      null :
      favorites[id] ?
        <Tooltip title={`Remove ${dog.name} from favorites`}><Icon style={{ color: 'rgba(205, 83, 96)' }} type="heart" onClick={this.toggleFavorite} /></Tooltip> :
        <Tooltip title={`Add ${dog.name} to favorites`}><Icon type="heart-o" onClick={this.toggleFavorite} /></Tooltip>;
    const inquiryIcon =
      <Tooltip title={`Ask about ${dog.name}`}><Icon type="message" onClick={this.props.toggleInquiryModal} /></Tooltip>;
    const editIcon = <Tooltip title="Edit info"><Icon type="edit" onClick={this.props.toggleEditModal} /></Tooltip>;

    let cardActions = null;
    let button = null;
    if (this.props.user && this.props.user.org_id > 1 && this.state.prevPath === '/profile') {
      button = <Button type="primary" className="hoverable" onClick={this.goBack} style={{ margin: '20px', backgroundColor: '#cd5360', borderColor: '#cd5360' }}><Icon type="left" />Back to dogs list</Button>;
    } else if (this.props.user && this.props.user.org_id === 1 && this.state.prevPath === '/profile') {
      button = <Button type="primary" className="hoverable" onClick={this.goBack} style={{ margin: '20px', backgroundColor: '#cd5360', borderColor: '#cd5360' }}><Icon type="left" />Back to favorite dogs</Button>;
    } else if (this.state.prevPath === '/search') {
      button = <Button type="primary" className="hoverable" onClick={this.goBack} style={{ margin: '20px', backgroundColor: '#cd5360', borderColor: '#cd5360' }}><Icon type="left" />Back to search</Button>;
    }

    if (this.props.user && dog.org_id === this.props.user.org_id) {
      cardActions = [adoptIcon, editIcon];
    } else if (this.props.user && this.props.user.org_id === 1) {
      cardActions = [inquiryIcon, favoriteIcon];
    } else if (!this.props.user) {
      cardActions = [inquiryIcon];
    }

    return (
      <CSSTransitionGroup
        transitionName="fade-appear"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div style={{ backgroundColor: 'rgba(205, 83, 96, 0.05)' }}>
          <Row>
            {button}
          </Row>
          <Row>
            <Col span={10} offset={3} >
              <Row style={{ marginTop: 30, marginBottom: 30 }} >
                <Card
                  style={{ borderRadius: 2, boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.2)' }}
                >
                  <h1> {dog.name} </h1>
                  <span style={{ fontWeight: 600, fontSize: 18, marginLeft: 5 }} > {dog.breed} {dog.mix ? 'mix' : ''} </span>
                  <Divider type="vertical" />
                  <span style={{ fontWeight: 600, fontSize: 16 }} > {dog.male ? 'Male' : 'Female'} </span>
                  <Divider type="vertical" />
                  <span style={{ fontWeight: 600, fontSize: 16 }} > {stage} </span>

                  <Divider />

                  <h2> About </h2>

                  <h3 style={{ marginLeft: 20 }}> Health </h3>
                  <div style={{ marginLeft: 40 }}>
                    <span style={{ fontWeight: 700 }}> Size: </span> {dog.size}
                  </div>
                  <div style={{ marginLeft: 40 }}> <span style={{ fontWeight: 700 }}> Neutered/spayed: </span> {dog.fixed ? 'yes' : 'no'} </div>
                  <div style={{ marginLeft: 40 }}>
                    <span style={{ fontWeight: 700 }}> Special needs: </span> {specialNeeds}
                  </div>

                  <h3 style={{ marginLeft: 20, marginTop: 20 }}> Behavior </h3>
                  <div style={{ marginLeft: 40 }}>
                    <span style={{ fontWeight: 700 }}> Energy level: </span> {dog.energy_level}
                  </div>
                  <div style={{ marginLeft: 40 }}>
                    <span style={{ fontWeight: 700 }}> Temperament concerns: </span> {temperament}
                  </div>

                  <h2 style={{ marginTop: 20 }} > Bio </h2>
                  <div style={{ marginLeft: 20 }} > {dog.description} </div>
                </Card>
              </Row>
              <Row style={{ marginBottom: 50 }} >
                {(!this.props.user || (this.props.user.org_id !== dog.org_id)) &&
                <OrgCard org={org} />}
              </Row>
            </Col>
            <Col span={8} offset={1}>
              <Row style={{ marginTop: 30, marginBottom: 50 }}>
                <Card
                  style={{ width: 350, backgroundColor: 'rgba(205, 83, 96, 0.05)' }}
                  cover={<img
                    alt="pupper"
                    src={photo}
                  />}
                  actions={cardActions}
                />
              </Row>
            </Col>
            <InquiryModal id={id} />
            <EditModal id={id} />
          </Row>
        </div>
      </CSSTransitionGroup>
    );
  }
}

const mapStateToProps = ({ search, storeUser }) => (
  {
    results: search.results,
    favorites: search.favorites.favoriteDogs,
    user: storeUser.user,
  }
);

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
  toggleInquiryModal,
  markAdopted,
  unmarkAdopted,
  toggleEditModal,
  searchDogById,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DogProfile));

// TODO: editable?????

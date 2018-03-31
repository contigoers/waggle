import React from 'react';
import { Card, Divider, Row, Col, Icon, message, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import OrgCard from './OrgCard';
import InquiryModal from './InquiryModal';

import { addFavorite, removeFavorite, markAdopted, unmarkAdopted } from '../actions/searchActions';
import { toggleInquiryModal } from '../actions/messagingActions';
import { toggleEditModal } from '../actions/editActions';
import EditModal from './EditModal';

class DogProfile extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleAdopted = this.toggleAdopted.bind(this);
  }

  async toggleFavorite() {
    const { id } = this.props.match.params;
    const dog = this.props.results.dogs[id];
    const { favorites } = this.props;
    const { favoriteParams } = this.props;

    const newFavoriteParams = {
      ...favoriteParams,
      dogId: id,
    };

    if (favorites[id]) {
      await this.props.removeFavorite(newFavoriteParams);
    } else {
      await this.props.addFavorite(newFavoriteParams);
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

  render() {
    const { id } = this.props.match.params;
    const dog = this.props.results.dogs[id];
    const { favorites } = this.props;
    const { adopted } = dog;
    dog.photo = Buffer.from(dog.photo);

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
      <Tooltip title={`Mark ${dog.name} not adopted`}><Icon type="check-circle" onClick={this.toggleAdopted} /></Tooltip> :
      <Tooltip title={`Mark ${dog.name} adopted`}><Icon type="check-circle-o" onClick={this.toggleAdopted} /></Tooltip>;
    const favoriteIcon = !favorites ? // eslint-disable-line
      null :
      favorites[id] ?
        <Tooltip title={`Remove ${dog.name} from favorites`}><Icon type="heart" onClick={this.toggleFavorite} /></Tooltip> :
        <Tooltip title={`Add ${dog.name} to favorites`}><Icon type="heart-o" onClick={this.toggleFavorite} /></Tooltip>;
    const inquiryIcon =
      <Tooltip title={`Ask about ${dog.name}`}><Icon type="message" onClick={this.props.toggleInquiryModal} /></Tooltip>;
    const editIcon = <Tooltip title="Edit info"><Icon type="edit" onClick={this.props.toggleEditModal} /></Tooltip>;

    let cardActions = null;

    if (this.props.user && dog.org_id === this.props.user.org_id) {
      cardActions = [adoptIcon, editIcon];
    } else if (this.props.user && this.props.user.org_id === 1) {
      cardActions = [inquiryIcon, favoriteIcon];
    } else if (!this.props.user) {
      cardActions = [inquiryIcon];
    }

    return (
      <Row>
        <Col span={10} offset={3} >
          <Row style={{ marginTop: 30, marginBottom: 30 }} >
            <Card>
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
            {(!this.props.user || (this.props.user.org_id !== dog.org_id)) && <OrgCard org={org} />}
          </Row>
        </Col>
        <Col span={8} offset={1}>
          <Row style={{ marginTop: 30 }}>
            <Card
              style={{ width: 350 }}
              cover={<img
                alt="pupper"
                src={dog.photo}
              />}
              actions={cardActions}
            />
          </Row>
        </Col>
        <InquiryModal id={id} />
        <EditModal id={id} />
      </Row>
    );
  }
}

const mapStateToProps = ({ search, storeUser }) => (
  {
    results: search.results,
    favorites: search.favorites.favoriteDogs,
    user: storeUser.user,
    favoriteParams: {
      adopterId: !storeUser.user ? 1 : storeUser.user.adopterId,
    },
  }
);

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
  toggleInquiryModal,
  markAdopted,
  unmarkAdopted,
  toggleEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(DogProfile);

// TODO: editable?????

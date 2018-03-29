import React from 'react';
import axios from 'axios';
import { Card, Divider, Row, Col, Icon, message, Button } from 'antd';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import OrgCard from './OrgCard';
import InquiryModal from './InquiryModal';

import { addFavorite, removeFavorite } from '../actions/searchActions';
import { toggleInquiryModal } from '../actions/messagingActions';

class DogProfile extends React.Component {
  constructor(props) {
    super(props);

    const { id } = this.props.match.params;

    this.state = {
      id,
      favorite: false,
      dog: this.props.results.dogs[id],
      adopted: this.props.results.dogs[id].adopted,
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleAdopted = this.toggleAdopted.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    if (user !== null) {
      if (user.org_id === 1) {
        const { favorites } = this.props;
        const { id } = this.props.match.params;
        if (favorites.length) {
          this.setState({
            favorite: favorites.some(fav => fav.id === +id),
          });
        }
      }
    }
  }

  toggleFavorite() {
    const { favoriteParams } = this.props;
    const newFavoriteParams = {
      ...favoriteParams,
      dogId: this.state.id,
    };

    if (this.state.favorite) {
      this.props.removeFavorite(newFavoriteParams);
    } else {
      this.props.addFavorite(newFavoriteParams);
    }
    this.setState({ favorite: !this.state.favorite }, () => {
      message.info(this.state.favorite ? 'Added to favorites!' : 'Removed from favorites.');
    });
  }

  toggleAdopted() {
    if (this.state.adopted) {
      this.unmarkAdopted();
    } else {
      this.markAdopted();
    }
    this.setState({ adopted: !this.state.adopted }, () => {
      message.info(this.state.adopted ? 'Updated to adopted!' : 'Marked as not adopted.');
    });
  }

  markAdopted() {
    console.log('adopted!', this.state.id);
    axios.post('/adopted', { dogId: this.state.id })
      .then((response) => {
        console.log('yay', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  unmarkAdopted() {
    console.log('not adopted!', this.state.id);
    axios.post('/adopted/remove', { dogId: this.state.id })
      .then((response) => {
        console.log('yay', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    const { dog } = this.state;

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

    const adoptButton = <Button type="primary" onClick={this.toggleAdopted} > {this.state.adopted ? 'Mark as not adopted' : 'Mark as adopted'} </Button>;
    const favoriteIcon = <Icon type={this.state.favorite ? 'heart' : 'heart-o'} onClick={this.toggleFavorite} />;
    const inquiryIcon = <Icon type="message" onClick={this.props.toggleInquiryModal} />;

    let cardActions = null;
    let cardButton = null;

    if (this.props.user && dog.org_id === this.props.user.org_id) {
      cardButton = [adoptButton];
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
            >
              {cardButton}
            </Card>
          </Row>
        </Col>
        <InquiryModal id={this.props.match.params.id} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DogProfile);

// TODO: editable?????

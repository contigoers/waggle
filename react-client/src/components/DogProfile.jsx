import React from 'react';
import { Card, Divider, Row, Col, Icon, message } from 'antd';
import { connect } from 'react-redux';
import OrgCard from './OrgCard';
import { addFavorite, removeFavorite } from '../actions/searchActions';

class DogProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      id: +this.props.location.pathname.slice(5),
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { favorites } = this.props;
    favorites.forEach(favorite => this.setState({ favorite: favorite.id === this.state.id }));
    // get id from url
    // var id = this.props.match.url; // '/dog/id/'
    // id = id.slice(5, id.length - 1);
    // gets dog at key id from store
    // const dog = null;
    // gets org at key dog.orgId from store
    // const org = null;
    // const dog = this.props.results.dogs['39'];
    // const org = this.props.results.orgs[dog[org_id]];
  }

  toggleFavorite() {
    const { favoriteParams } = this.props;
    favoriteParams.dogId = this.state.id;
    if (this.state.favorite) {
      this.props.removeFavorite(favoriteParams);
    } else {
      this.props.addFavorite(favoriteParams);
    }
    this.setState({ favorite: !this.state.favorite }, () => {
      message.info(this.state.favorite ? 'Added to favorites!' : 'Removed from favorites.');
    });
  }

  render() {
    console.log('props', this.props);
    const dog = this.props.results.dogs[this.state.id];
    console.log(dog);
    const org = this.props.results.orgs[dog.org_id];

    let stage = dog.lifestage.charAt(0).toUpperCase() + dog.lifestage.slice(1);
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

    return (
      <div>
        <Row style={{ marginTop: 30, marginBottom: 30 }} >
          <Col span={10} offset={3} >
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
          </Col>
          <Col span={8} offset={1}>
            <Card
              style={{ width: 350 }}
              cover={<img
                alt="pupper"
                src={dog.photo}
              />}
              actions={[<Icon onClick={this.toggleFavorite} type={this.state.favorite ? 'heart' : 'heart-o'} />]}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 50 }} >
          <OrgCard org={org} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ search, profile }) => (
  {
    results: search.results,
    favorites: search.favorites,
    favoriteParams: {
      adopterId: profile.adopter.id,
      dogId: null,
    },
  }
);

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(DogProfile);

// TODO: editable?????

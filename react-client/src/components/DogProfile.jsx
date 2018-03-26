import React from 'react';
import { Card, Divider, Row, Col, Icon, message } from 'antd';
import { connect } from 'react-redux';
import OrgCard from './OrgCard';


class DogProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      dog: this.props.results.dogs[this.props.location.pathname.slice(5)],
      // this ^ should set the dog equal to the dog object
      adopted: this.props.results.dogs[this.props.location.pathname.slice(5)].favorite,
      // making this ^ its own property so we can change it with set state, for now
      isMyDog: this.props.user ? this.props.user.org_id === this.props.results.dogs[this.props.location.pathname.slice(5)].org_id : false, // this.state.dog.org_id === this.props.storeUser.user.org_id,
      // ^ boolean for if user in props has the same org id as the dog
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleAdopted = this.toggleAdopted.bind(this);
  }

  toggleFavorite() {
    this.setState({ favorite: !this.state.favorite }, () => {
      message.info(this.state.favorite ? 'Added to favorites!' : 'Removed from favorites.');
    });
  }

  toggleAdopted() {
    this.setState({ adopted: !this.state.adopted }, () => {
      message.info(this.state.adopted ? 'Updated to adopted!' : 'Marked as not adopted');
      // should actually update dog's adopted status in the database eventually
    });
  }

  render() {
    console.log(this.props);
    const { dog } = this.state;
    const org = this.props.results.orgs[dog.org_id];
    // const { user } = this.props.storeUser;

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

    const favoriteIcon = this.state.favorite ? 'heart' : 'heart-o';
    const adoptIcon = this.state.adopted ? 'smile' : 'smile-o';
    const cardType = this.state.isMyDog ? adoptIcon : favoriteIcon;

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
              actions={
                [<Icon
                  onClick={this.state.isMyDog ? this.toggleAdopted : this.toggleFavorite}
                  type={cardType}
                />]
              }
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 50 }} >
          {!this.state.isMyDog && <OrgCard org={org} />}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  results: state.search.results,
  user: state.storeUser.user,
});

export default connect(mapStateToProps, null)(DogProfile);

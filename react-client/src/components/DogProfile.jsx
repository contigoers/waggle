import React from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';

const { Meta } = Card;

// on component mount, ~get~ dog by id
class DogProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log(this.props.state);
  }

  render() {
    let { breed } = this.props.profile;
    breed = breed.charAt(0).toUpperCase() + breed.slice(1);

    if (this.props.profile.mix) { breed += ' mix'; }

    const { profile } = this.props;

    let stage = profile.lifestage.charAt(0).toUpperCase() + profile.lifestage.slice(1);
    if (profile.age) {
      stage += ` (age ${profile.age})`;
    }

    let temperament = '';
    if (profile.anxious && profile.aggressive) {
      temperament = 'Anxiety, Aggression';
    } else if (profile.anxious) {
      temperament = 'Anxiety';
    } else if (profile.aggressive) {
      temperament = 'Aggression';
    } else {
      temperament = 'None';
    }

    let specialNeeds = '';
    if (profile.diet && profile.medical) {
      specialNeeds = 'Diet, Medical';
    } else if (profile.diet) {
      specialNeeds = 'Diet';
    } else if (profile.medical) {
      specialNeeds = 'Medical';
    } else {
      specialNeeds = 'None';
    }

    return (
      <Row>
        <Col span={8} offset={4}>
          <Card
            style={{ width: 250 }}
            cover={<img alt="pupper" src="https://static01.nyt.com/images/2018/02/11/realestate/11dogs-topbreeds-Chihuahua/11dogs-topbreeds-Chihuahua-master495.jpg" />}
          >
            <Meta
              title={profile.name}
              description={breed}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div> {profile.male ? 'Male' : 'Female'} </div>
            <div> {stage} </div>
            <div> Size: {profile.size} </div>
            <div> Energy level: {profile.energy_level} </div>
            <div> Fixed: {profile.fixed ? 'yes' : 'no'} </div>
            <div> Special needs: {specialNeeds} </div>
            <div> Temperament concerns: {temperament} </div>
            <div> Description: {profile.description} </div>
          </Card>
        </Col>
      </Row>

    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps, null)(DogProfile);

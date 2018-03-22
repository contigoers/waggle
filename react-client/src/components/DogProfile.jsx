import React from 'react';
import { Card, Divider, Row, Col } from 'antd';
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

    const phone = `(${profile.phone.slice(1, 4)}) ${profile.phone.slice(4, 7)}-${profile.phone.slice(7)}`;

    return (
      <div>
        <Row style={{ marginTop: 30, marginBottom: 30 }} >
          <Col span={10} offset={3} >
            <Card>
              <h1> {profile.name} </h1>
              <span style={{ fontWeight: 600, fontSize: 18, marginLeft: 5 }} > {breed} </span>
              <Divider type="vertical" />
              <span style={{ fontWeight: 600, fontSize: 16 }} > {profile.male ? 'Male' : 'Female'} </span>
              <Divider type="vertical" />
              <span style={{ fontWeight: 600, fontSize: 16 }} > {stage} </span>

              <Divider />

              <h2> About </h2>

              <h3 style={{ marginLeft: 20 }}> Health </h3>
              <div style={{ marginLeft: 40 }}>
                <span style={{ fontWeight: 700 }}> Size: </span> {profile.size}
              </div>
              <div style={{ marginLeft: 40 }}> {profile.fixed ? 'N' : 'Not n'}eutered/spayed </div>
              <div style={{ marginLeft: 40 }}>
                <span style={{ fontWeight: 700 }}> Special needs: </span> {specialNeeds}
              </div>

              <h3 style={{ marginLeft: 20, marginTop: 20 }}> Behavior </h3>
              <div style={{ marginLeft: 40 }}>
                <span style={{ fontWeight: 700 }}> Energy level: </span> {profile.energy_level}
              </div>
              <div style={{ marginLeft: 40 }}>
                <span style={{ fontWeight: 700 }}> Temperament concerns: </span> {temperament}
              </div>

              <h2 style={{ marginTop: 20 }} > Bio </h2>
              <div style={{ marginLeft: 20 }} > {profile.description} </div>
            </Card>
          </Col>
          <Col span={8} offset={1}>
            <Card
              style={{ width: 350 }}
              cover={<img alt="pupper" src="https://static01.nyt.com/images/2018/02/11/realestate/11dogs-topbreeds-Chihuahua/11dogs-topbreeds-Chihuahua-master495.jpg" />}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 50 }} >
          <Col span={10} offset={3}>
            <Card>
              <Meta title="Shelter Info" />
              <Divider />
              <h4> {profile.orgName} </h4>
              <div style={{ marginTop: 10 }}> {profile.address} </div>
              <div> {profile.city}, {profile.state} {profile.zipcode} </div>
              <div style={{ marginTop: 10 }}> {phone} </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps, null)(DogProfile);

// TODO: editable?????

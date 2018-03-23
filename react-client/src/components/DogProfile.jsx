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
    const { dog } = this.props.profile;
    const { org } = this.props.profile;

    let { breed } = dog;
    breed = breed.charAt(0).toUpperCase() + breed.slice(1);

    if (dog.mix) { breed += ' mix'; }

    let stage = dog.lifestage.charAt(0).toUpperCase() + dog.lifestage.slice(1);
    if (dog.age) {
      stage += ` (age ${dog.age})`;
    }

    let temperament = '';
    if (dog.anxious && dog.aggressive) {
      temperament = 'Anxiety, Aggression';
    } else if (dog.anxious) {
      temperament = 'Anxiety';
    } else if (dog.aggressive) {
      temperament = 'Aggression';
    } else {
      temperament = 'None';
    }

    let specialNeeds = '';
    if (dog.diet && dog.medical) {
      specialNeeds = 'Diet, Medical';
    } else if (dog.diet) {
      specialNeeds = 'Diet';
    } else if (dog.medical) {
      specialNeeds = 'Medical';
    } else {
      specialNeeds = 'None';
    }

    const phone = `(${org.phone.slice(1, 4)}) ${org.phone.slice(4, 7)}-${org.phone.slice(7)}`;

    return (
      <div>
        <Row style={{ marginTop: 30, marginBottom: 30 }} >
          <Col span={10} offset={3} >
            <Card>
              <h1> {dog.name} </h1>
              <span style={{ fontWeight: 600, fontSize: 18, marginLeft: 5 }} > {breed} </span>
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
              <div style={{ marginLeft: 40 }}> {dog.fixed ? 'N' : 'Not n'}eutered/spayed </div>
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
              cover={<img alt="pupper" src="https://static01.nyt.com/images/2018/02/11/realestate/11dogs-topbreeds-Chihuahua/11dogs-topbreeds-Chihuahua-master495.jpg" />}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 50 }} >
          <Col span={10} offset={3}>
            <Card>
              <Meta title="Shelter Info" />
              <Divider />
              <h4> {org.name} </h4>
              <div style={{ marginTop: 10 }}> {org.address} </div>
              <div> {org.city}, {dog.state} {org.zipcode} </div>
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

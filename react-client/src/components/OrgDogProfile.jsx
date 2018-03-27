import React from 'react';
import { Card, Divider, Row, Col, Icon, message } from 'antd';
import { connect } from 'react-redux';


class OrgDogProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adopted: this.props.location.state.orgDog.adopted,
    };
    this.toggleAdopted = this.toggleAdopted.bind(this);
  //  this.componentDidMount = this.componentDidMount.bind(this);
  }

  // componentDidMount() {
  // }

  toggleAdopted() {
    this.setState({ adopted: !this.state.adopted }, () => {
      message.info(this.state.adopted ? 'Updated to adopted!' : 'Marked as not adopted');
    });
  }

  render() {
    console.log('props', this.props);
    const url = this.props.location.pathname;
    const id = url.slice(8);
    console.log(id);

    const dog = this.props.location.state.orgDog;
    console.log(dog);

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
              actions={[<Icon onClick={this.toggleAdopted} type={this.state.adopted ? 'smile' : 'smile-o'} />]}
            />
            <span style={{ marginLeft: 80 }}> {this.state.adopted ? 'Mark as not adopted!' : 'Mark as adopted!'} </span>

          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log('STATE', state);
  return state;
};

export default connect(mapStateToProps, null)(OrgDogProfile);

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Divider } from 'antd';

// onclick should render a new profile page with org signed in (from state?)
// and dog from that result

class OrgDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seeProfile: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // onclick sends to profile page
  handleClick() {
    // reroute to url /dog/[dog.id]
    this.setState({ seeProfile: true });
  }

  render() {
    const { dog } = this.props;
    const url = `/orgDog/${dog.id}`;

    if (this.state.seeProfile) {
      return (<Redirect to={{
        pathname: url,
        state: { orgDog: this.props.dog },
      }}
      />);
    }

    const stage = dog.lifestage
      .charAt(0)
      .toUpperCase() + dog.lifestage.slice(1);

    return (
      <Card
        style={{ width: 300, margin: 30, marginLeft: 200 }}
        cover={<img alt="pupper" src={dog.photo} />}
        onClick={this.handleClick}
      >
        <Card.Meta title={dog.name} />
        <div style={{ marginTop: 10 }}>
          <span> {dog.breed} {dog.mix ? 'mix' : ''} </span>
          <Divider type="vertical" />
          <span> {dog.male ? 'Male' : 'Female'} </span>
          <Divider type="vertical" />
          <span> {stage} </span>
          <Divider type="vertical" />
          <span> {dog.adopted ? 'Adopted' : 'Not Adopted'} </span>
        </div>

      </Card>
    );
  }
}

const mapStateToProps = state => ({ results: state.search.results });

export default connect(mapStateToProps, null)(OrgDog);

// TODO: make photo in card view square

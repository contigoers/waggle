import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Divider, Icon, message } from 'antd';

// onclick should render a new profile page with org signed in (from state?)
// and dog from that result

class OrgDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adopted: false,
      seeProfile: false,
    };
    this.toggleAdopted = this.toggleAdopted.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // onclick sends to profile page
  onClick() {
    // reroute to url /dog/[dog.id]
    this.setState({ seeProfile: true });
  }

  toggleAdopted() {
    this.setState({ adopted: !this.state.adopted }, () => {
      message.info(this.state.adopted ? 'Updated to adopted!' : 'Marked as not adopted');
    });
  }

  render() {
    const { dog } = this.props;

    const url = `/dog/${dog.id}`;

    if (this.state.seeProfile) {
      return (<Redirect to={{
        pathname: url,
        props: { orgDog: this.props },
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
        actions={[<Icon onClick={this.toggleAdopted} type={this.state.adopted ? 'smile' : 'smile-o'} />]}
        onClick={this.onClick}
      >
        <Card.Meta title={dog.name} />
        <div style={{ marginTop: 10 }}>
          <span> {dog.breed} {dog.mix ? 'mix' : ''} </span>
          <Divider type="vertical" />
          <span> {dog.male ? 'Male' : 'Female'} </span>
          <Divider type="vertical" />
          <span> {stage} </span>
        </div>

      </Card>
    );
  }
}

const mapStateToProps = state => ({ results: state.search.results });

export default connect(mapStateToProps, null)(OrgDog);

// TODO: make photo in card view square

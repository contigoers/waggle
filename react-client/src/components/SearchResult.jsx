import React from 'react';
import { Card, Divider } from 'antd';

// onclick should render a new profile page with org signed in (from state?)
// and dog from that result

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // onclick renders profile from dog
  //   renderProfile() {
  // get org from dog org_id?
  //     // renders  profile page
  //   }

  render() {
    const { dog } = this.props;

    const stage = dog.lifestage
      .charAt(0)
      .toUpperCase() + dog.lifestage.slice(1);

    return (
      <Card
        style={{ width: 300 }}
        cover={<img alt="pupper" src={dog.photo} />}
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

export default SearchResult;

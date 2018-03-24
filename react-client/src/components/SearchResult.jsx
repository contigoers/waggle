import React from 'react';
import { connect } from 'react-redux';
import { Card, Divider, Icon } from 'antd';

// onclick should render a new profile page with org signed in (from state?)
// and dog from that result

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggleFavorite() {
    this.setState({ favorite: !this.state.favorite });
  }

  // onclick sends to profile page
  //   onClick() {
  //     // reroute to url /dog/[dog.id]
  //   }

  render() {
    const { dog } = this.props;

    const stage = dog.lifestage
      .charAt(0)
      .toUpperCase() + dog.lifestage.slice(1);

    return (
      <Card
        style={{ width: 300, margin: 30, marginLeft: 200 }}
        cover={<img alt="pupper" src={dog.photo} />}
        actions={[<Icon onClick={this.toggleFavorite} type={this.state.favorite ? 'heart' : 'heart-o'} />]}
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

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps, null)(SearchResult);

// TODO: make photo in card view square

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Divider, Icon, message } from 'antd';
import { addFavorite, removeFavorite } from '../actions/searchActions';

// onclick should render a new profile page with org signed in (from state?)
// and dog from that result

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      // fix ^ (how without get request? might need to do a get request on componentdidmount)
      seeProfile: false,
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.org_id > 1) {
      console.log('yay search result');
    } else {
      const { favorites } = this.props;
      favorites.forEach((favorite) => {
        if (favorite.id === this.props.dog.id) {
          this.setState({ favorite: true });
        }
      });
    }
  }

  // onclick sets state to send to profile page at /dog/:id
  onClick() {
    this.setState({ seeProfile: true });
  }

  toggleFavorite() {
    const { favoriteParams } = this.props;
    favoriteParams.dogId = this.props.dog.id;
    if (this.state.favorite) {
      this.props.removeFavorite(favoriteParams);
    } else {
      this.props.addFavorite(favoriteParams);
    }
    this.setState({ favorite: !this.state.favorite }, () => {
      message.info(this.state.favorite ? 'Added to favorites!' : 'Remove from favorites');
    });
  }

  render() {
    const { dog } = this.props;

    const url = `/dog/${dog.id}`;

    if (this.state.seeProfile) {
      return <Redirect to={url} />;
    }

    const stage = dog.lifestage
      .charAt(0)
      .toUpperCase() + dog.lifestage.slice(1);

    const adoptedStyle = { color: '#00db19', fontWeight: 700 };
    const notAdoptedStyle = { color: '#db0000', fontWeight: 700 };

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
        <div style={dog.adopted ? adoptedStyle : notAdoptedStyle}> {dog.adopted ? 'Adopted' : 'Not adopted' } </div>

      </Card>
    );
  }
}

const mapStateToProps = ({ search, storeUser }) => (
  {
    results: search.results,
    favorites: search.favorites,
    user: storeUser.user,
    favoriteParams: {
      adopterId: !storeUser.user ? 1 : storeUser.user.adopterId,
      dogId: null,
    },
  }
);

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

// TODO: make photo in card view square

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startCase } from 'lodash';
import { Card, Divider, Icon, message } from 'antd';
import { addFavorite, removeFavorite } from '../actions/searchActions';

class DogCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      seeProfile: false,
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user !== null) {
      if (user.org_id === 1) {
        const { favorites } = this.props;
        favorites.some(((favorite) => {
          if (favorite.id === +this.props.dog.id) {
            this.setState({ favorite: true });
          }
        }));
      }
    }
  }

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

    const stage = startCase(dog.lifestage);

    const adoptedStyle = { color: '#00db19', fontWeight: 700, marginTop: 5 };
    const notAdoptedStyle = { color: '#db0000', fontWeight: 700, marginTop: 5 };

    return (
      <Card
        hoverable
        style={{ width: 300, margin: 30, float: 'left' }}
        cover={<img alt="pupper" onClick={this.onClick} src={dog.photo} style={{ height: 300, width: 300, objectFit: 'cover' }} />}
        actions={
          this.props.user && this.props.user.org_id === 1 ?
          [<Icon onClick={this.toggleFavorite} type={this.state.favorite ? 'heart' : 'heart-o'} />] : null
        }
      >
        <Card.Meta title={dog.name} onClick={this.onClick} />
        <div style={{ marginTop: 10 }} >
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

export default connect(mapStateToProps, mapDispatchToProps)(DogCard);

// TODO: make photo in card view square

import React from 'react';
import { connect } from 'react-redux';
import { Button, BackTop } from 'antd';
import { forOwn, keys } from 'lodash';
import { Redirect } from 'react-router-dom';
import { updateSearchQuery, dogsSearch, getFavorites, getRandomDog, getOrgDogs } from '../actions/searchActions';
import SearchResults from './SearchResults';
import GenderSelect from './SearchComponents/Gender';
import LifestageSelect from './SearchComponents/Lifestage';
import SizeSelect from './SearchComponents/Size';
import BreedSelect from './SearchComponents/Breed';
import MixSelect from './SearchComponents/Mix';
import NeuteredSelect from './SearchComponents/Neutered';
import DietSelect from './SearchComponents/Diet';
import MedicalSelect from './SearchComponents/Medical';
import EnergySelect from './SearchComponents/Energy';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      moreFilters: false,
      redirect: false,
    };
    this.fetchAndRedirect = this.fetchAndRedirect.bind(this);
    this.submitData = this.submitData.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      if (user.adopterId) {
        this.getFavorites();
      }
    }
  }

  getFavorites() {
    const { adopterParams } = this.props;
    this.props.getFavorites({ params: adopterParams });
  }

  toggleFilter() {
    this.setState({
      moreFilters: !this.state.moreFilters,
    });
  }

  submitData() {
    const searchObject = {};
    const { params } = this.props;
    forOwn(params, (value, key) => {
      if (value.length) {
        searchObject[key] = value;
      }
    });
    this.props.dogsSearch(searchObject);
  }

  async fetchAndRedirect() {
    await this.props.getRandomDog();
    let id;

    forOwn(this.props.results.dogs, (value, key) => {
      id = key;
    });
    this.setState({
      redirect: true,
      id,
    });
  }

  render() {
    return (
      <div className="search-div">
        <Button onClick={this.fetchAndRedirect} style={{ marginBottom: 10 }} >
          I&apos;m feeling lucky
        </Button>
        {this.state.redirect && <Redirect to={`/dog/${this.state.id}`} />}
        <div className="default-filters">
          <div className="breed">
            <p>Breed</p>
            <BreedSelect />
          </div>
          <div className="gender">
            <p>Gender</p>
            <GenderSelect />
          </div>
          <div className="size">
            <p>Size</p>
            <SizeSelect />
          </div>
          <div className="lifestage">
            <p>Lifestage</p>
            <LifestageSelect />
          </div>
        </div>
        {this.state.moreFilters ?
          <div className="more-filters">
            <div className="mix">
              <p>Mix Breed</p>
              <MixSelect />
            </div>
            <div className="neutered">
              <p>Neutered</p>
              <NeuteredSelect />
            </div>
            <div className="diet">
              <p>Diet Needs</p>
              <DietSelect />
            </div>
            <div className="medical">
              <p>Medical Needs</p>
              <MedicalSelect />
            </div>
            <div className="energy">
              <p>Energy Level</p>
              <EnergySelect />
            </div>
          </div>
          :
          null
        }
        <Button className="submit-search" onClick={this.toggleFilter}>
          {this.state.moreFilters ? 'Less' : 'More'} Filters
        </Button>
        <Button className="submit-search" onClick={this.submitData}>
          Submit
        </Button>
        {keys(this.props.results).length > 0 && <SearchResults />}
        <BackTop />
      </div>
    );
  }
}

const mapStateToProps = ({ search, storeUser }) => (
  {
    params: {
      breed: search.breed,
      male: search.gender,
      lifestage: search.lifestage,
      size: search.size,
      mix: search.mix,
      fixed: search.neutered,
      diet: search.diet,
      medical: search.medical,
      energy_level: search.energy,
    },
    results: search.results,
    favorites: search.favorites.favoriteDogs,
    user: storeUser.user,
    adopterParams: {
      adopterId: !storeUser.user ? null : storeUser.user.adopterId,
    },
    orgParams: {
      type: 'orgId',
      value: !storeUser.user ? 1 : storeUser.user.org_id,
    },
  }
);

const mapDispatchToProps = {
  updateSearchQuery,
  dogsSearch,
  getFavorites,
  getRandomDog,
  getOrgDogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

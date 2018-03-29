import React from 'react';
import { connect } from 'react-redux';
import { Button, BackTop } from 'antd';
import { forOwn, keys } from 'lodash';
import { updateSearchQuery, dogsSearch, getFavorites } from '../actions/searchActions';
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
    };
    this.submitData = this.submitData.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
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
      searchObject[key] = value;
    });
    this.props.dogsSearch(searchObject);
  }

  render() {
    return (
      <div className="search-div">
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

const mapStateToProps = ({ searchQuery, search, profile }) => (
  {
    params: {
      breed: searchQuery.breed,
      male: searchQuery.gender,
      lifestage: searchQuery.lifestage,
      size: searchQuery.size,
      mix: searchQuery.mix,
      fixed: searchQuery.neutered,
      diet: searchQuery.diet,
      medical: searchQuery.medical,
      energy_level: searchQuery.energy,
    },
    results: search.results,
    favorites: search.favorites,
    adopterParams: {
      adopterId: profile.adopter.id,
    },
  }
);

const mapDispatchToProps = {
  updateSearchQuery,
  dogsSearch,
  getFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

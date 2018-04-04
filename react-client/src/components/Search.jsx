import React from 'react';
import { connect } from 'react-redux';
import { Button, BackTop, Divider, Collapse } from 'antd';
import { forOwn, keys } from 'lodash';
import { withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
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

    this.fetchAndRedirect = this.fetchAndRedirect.bind(this);
    this.submitData = this.submitData.bind(this);
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
    const [id] = Object.keys(this.props.results.dogs);
    this.props.history.push(`/dog/${id}`);
  }

  render() {
    const { Panel } = Collapse;
    return (
      <CSSTransitionGroup
        transitionName="fade-appear"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="search-div">
          <div className="title">
            <Divider>Find The Dog That Fits Your Lifestyle!</Divider>
          </div>
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
          <Collapse>
            <Panel header="More filters">
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
            </Panel>
          </Collapse>
          <Button className="lucky-button search-button" onClick={this.fetchAndRedirect} style={{ marginBottom: 10 }} >
            I&apos;m Feeling Lucky
          </Button>

          <Button className="submit-search search-button" onClick={this.submitData}>
          Submit
          </Button>
          <Divider />
          <div className="search-results">
            <div className="results-number">
              {keys(this.props.results).length > 0 ? `${keys(this.props.results.dogs).length} Results Found` : ''}
            </div>
            <CSSTransitionGroup
              transitionName="fade-enter"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {keys(this.props.results).length > 0 && <SearchResults />}
            </CSSTransitionGroup>
          </div>
          <BackTop />
        </div>
      </CSSTransitionGroup>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

import React from 'react';
import { connect } from 'react-redux';
import { Button, BackTop, Divider, Collapse } from 'antd';
import { forOwn, keys, some } from 'lodash';
import { withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { clearSearchQuery, updateSearchQuery, dogsSearch, getFavorites, getRandomDog, getOrgDogs } from '../actions/searchActions';
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
    this.clearSearch = this.clearSearch.bind(this);
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

  clearSearch() {
    this.props.clearSearchQuery();
    this.sizeRef.props.form.resetFields();
    this.genderRef.props.form.resetFields();
    this.lifestageRef.props.form.resetFields();
    this.breedRef.props.form.resetFields();
    this.mixRef.props.form.resetFields();
    this.medicalRef.props.form.resetFields();
    this.dietRef.props.form.resetFields();
    this.energyRef.props.form.resetFields();
    this.neuteredRef.props.form.resetFields();
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
          <div>
            <div className="default-filters">
              <div className="breed">
                <p>Breed</p>
                <BreedSelect
                  wrappedComponentRef={(breedRef) => { this.breedRef = breedRef; }}
                />
              </div>
              <div className="gender">
                <p>Gender</p>
                <GenderSelect
                  wrappedComponentRef={(genderRef) => { this.genderRef = genderRef; }}
                />
              </div>
              <div className="size">
                <p>Size</p>
                <SizeSelect
                  wrappedComponentRef={(sizeRef) => { this.sizeRef = sizeRef; }}
                />
              </div>
              <div className="lifestage">
                <p>Lifestage</p>
                <LifestageSelect
                  wrappedComponentRef={(lifestageRef) => { this.lifestageRef = lifestageRef; }}
                />
              </div>
            </div>
            <Collapse>
              <Panel header="More filters">
                <div className="more-filters">
                  <div className="mix">
                    <p>Mix Breed</p>
                    <MixSelect
                      wrappedComponentRef={(mixRef) => { this.mixRef = mixRef; }}
                    />
                  </div>
                  <div className="neutered">
                    <p>Neutered</p>
                    <NeuteredSelect
                      wrappedComponentRef={(neuteredRef) => { this.neuteredRef = neuteredRef; }}
                    />
                  </div>
                  <div className="diet">
                    <p>Diet Needs</p>
                    <DietSelect
                      wrappedComponentRef={(dietRef) => { this.dietRef = dietRef; }}
                    />
                  </div>
                  <div className="medical">
                    <p>Medical Needs</p>
                    <MedicalSelect
                      wrappedComponentRef={(medicalRef) => { this.medicalRef = medicalRef; }}
                    />
                  </div>
                  <div className="energy">
                    <p>Energy Level</p>
                    <EnergySelect
                      wrappedComponentRef={(energyRef) => { this.energyRef = energyRef; }}
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>

          <Button className="lucky-button search-button" onClick={this.fetchAndRedirect} style={{ marginBottom: 10 }} >
            I&apos;m Feeling Lucky
          </Button>

          <Button className="submit-search search-button" onClick={this.submitData}>
          Submit
          </Button>

          {some(this.props.params, value => value.length) &&
          <Button className="reset-search search-button" onClick={this.clearSearch} style={{ marginLeft: 20 }} >
          Reset Search
          </Button>}

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
  clearSearchQuery,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

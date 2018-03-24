import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { forOwn, keys } from 'lodash';
import { updateSearchQuery, dogsSearch } from '../actions/searchActions';
import { updateSearchView } from '../actions/searchViewActions';
import breedList from '../../../database/breeds';
import SearchResults from './SearchResults';

class Search extends React.Component {
  constructor() {
    super();
    this.addsToFilterState = this.addsToFilterState.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  addsToFilterState({ target: { id, value, checked } }) {
    let valueChanged = value;
    if (id === 'male') {
      this.toggleGenderCheck(value, checked);
      if (value === 'male') {
        valueChanged = true;
      } else if (value === 'female') {
        valueChanged = false;
      }
    } else if (id === 'size') {
      this.toggleSizeCheck(value, checked);
    } else if (id === 'lifestage') {
      this.toggleLifeStageCheck(value, checked);
    }
    this.props.updateSearchQuery(id, valueChanged, checked);
  }

  addBreedToFilterState(value) {
    this.props.updateSearchQuery('breed', value, true);
  }

  toggleGenderCheck(value, checked, { female, male } = this.props.searchSelections) {
    if ((value === 'male' || value === 'female') && checked) {
      const payload = {
        anyGender: false,
        [value]: true,
      };
      this.props.updateSearchView(payload);
    } else if (!checked) {
      const payload = {
        [value]: false,
      };
      this.props.updateSearchView(payload);
    }
    if ((value === 'anyGender' && checked)) {
      const payload = {
        female: false,
        male: false,
        anyGender: true,
      };
      this.props.updateSearchView(payload);
    }
    if ((value === 'male' && female && checked) ||
        (value === 'female' && male && checked)) {
      setTimeout(() => {
        const payload = {
          female: false,
          male: false,
          anyGender: true,
        };
        this.props.updateSearchView(payload);
      }, 300);
    }
  }

  toggleSizeCheck(value, checked, {
    tiny, small, medium, large, giant,
  } = this.props.searchSelections) {
    if (value !== 'anySize' && checked) {
      const payload = {
        anySize: false,
        [value]: true,
      };
      this.props.updateSearchView(payload);
    } else if (!checked) {
      const payload = {
        [value]: false,
      };
      this.props.updateSearchView(payload);
    }
    if ((value === 'anySize' && checked)) {
      const payload = {
        tiny: false,
        small: false,
        medium: false,
        large: false,
        giant: false,
        anySize: true,
      };
      this.props.updateSearchView(payload);
    }
    if ((value === 'tiny' && small && medium && large && giant && checked) ||
        (value === 'small' && tiny && medium && large && giant && checked) ||
        (value === 'medium' && tiny && small && large && giant && checked) ||
        (value === 'large' && tiny && small && medium && giant && checked) ||
        (value === 'giant' && tiny && small && medium && large && checked)
    ) {
      setTimeout(() => {
        const payload = {
          tiny: false,
          small: false,
          medium: false,
          large: false,
          giant: false,
          anySize: true,
        };
        this.props.updateSearchView(payload);
      }, 300);
    }
  }

  toggleLifeStageCheck(value, checked, {
    puppy, adolescent, adult, senior,
  } = this.props.searchSelections) {
    if (value !== 'anyLifestage' && checked) {
      const payload = {
        anyLifestage: false,
        [value]: true,
      };
      this.props.updateSearchView(payload);
    } else if (!checked) {
      const payload = {
        [value]: false,
      };
      this.props.updateSearchView(payload);
    }
    if ((value === 'anyLifestage' && checked)) {
      const payload = {
        puppy: false,
        adolescent: false,
        adult: false,
        senior: false,
        anyLifestage: true,
      };
      this.props.updateSearchView(payload);
    }
    if ((value === 'puppy' && adolescent && adult && senior && checked) ||
        (value === 'adolescent' && puppy && adult && senior && checked) ||
        (value === 'adult' && puppy && adolescent && senior && checked) ||
        (value === 'senior' && puppy && adolescent && adult && checked)
    ) {
      setTimeout(() => {
        const payload = {
          puppy: false,
          adolescent: false,
          adult: false,
          senior: false,
          anyLifestage: true,
        };
        this.props.updateSearchView(payload);
      }, 300);
    }
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

  render() {
    const breedDataSource = breedList;
    return (
      <div className="search-div">
        <div className="search-filters">
          <div className="breed-filter">
            Breed
            <div className="breed-list">
              <AutoComplete
                dataSource={breedDataSource}
                style={{ width: 500 }}
                id="breed"
                placeholder="enter breed"
                defaultValue="Any Breed"
                filterOption={(inputValue, option) => option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1}
                onSelect={inputValue => this.addBreedToFilterState(inputValue)}
              />
            </div>
          </div>
          <div className="gender-filter">
            Gender
            <div className="gender-list">
              <Row>
                <Col span={4}><Checkbox checked={this.props.searchSelections.anyGender} id="male" value="anyGender" onChange={this.addsToFilterState}>Any Gender</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.male} id="male" value="male" onChange={this.addsToFilterState}>Male</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.female} id="male" value="female" onChange={this.addsToFilterState}>Female</Checkbox></Col>
              </Row>
            </div>
          </div>
          <div className="size-filter">
            Size
            <div className="size-list">
              <Row>
                <Col span={4}><Checkbox checked={this.props.searchSelections.anySize} id="size" value="anySize" onChange={this.addsToFilterState}>Any Size</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.tiny} id="size" value="tiny" onChange={this.addsToFilterState}>Tiny</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.small} id="size" value="small" onChange={this.addsToFilterState}>Small</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.medium} id="size" value="medium" onChange={this.addsToFilterState}>Medium</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.large} id="size" value="large" onChange={this.addsToFilterState}>Large</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.giant} id="size" value="giant" onChange={this.addsToFilterState}>Giant</Checkbox></Col>
              </Row>
            </div>
          </div>
          <div className="age-filter">
            Life Stage
            <div className="age-list">
              <Row>
                <Col span={4}><Checkbox checked={this.props.searchSelections.anyLifestage} id="lifestage" value="anyLifestage" onChange={this.addsToFilterState}>Any Lifestage</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.puppy} id="lifestage" value="puppy" onChange={this.addsToFilterState}>Puppy</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.adolescent} id="lifestage" value="adolescent" onChange={this.addsToFilterState}>Adolescent</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.adult} id="lifestage" value="adult" onChange={this.addsToFilterState}>Adult</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.props.searchSelections.senior} id="lifestage" value="senior" onChange={this.addsToFilterState}>Senior</Checkbox></Col>
              </Row>
            </div>
          </div>
        </div>
        <Button className="submit-search" onClick={this.submitData}>
          Submit
        </Button>
        {keys(this.props.results).length > 0 && (
          <SearchResults />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ search, searchSelections }) => (
  {
    params: {
      breed: search.breed,
      male: search.male,
      lifestage: search.lifestage,
      size: search.size,
    },
    results: search.results,
    searchSelections,
  }
);

const mapDispatchToProps = {
  updateSearchQuery,
  dogsSearch,
  updateSearchView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

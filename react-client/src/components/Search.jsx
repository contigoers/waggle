import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { forOwn } from 'lodash';
import { Redirect } from 'react-router-dom';
import { updateSearchQuery, dogsSearch } from '../actions/searchActions';
import breedList from '../../../database/breeds';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      AnyGender: false,
      Male: false,
      Female: false,
      getResults: false,
    };
    this.addsToFilterState = this.addsToFilterState.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  addsToFilterState({ target: { id, value, checked } }) {
    this.toggleGenderCheck(value, checked);
    let valueChanged = value;
    if (id === 'size' || id === 'lifestage') {
      valueChanged = value.toLowerCase();
    }
    if (id === 'male' && value === 'Male') {
      valueChanged = true;
    } else if (id === 'male' && value === 'Female') {
      valueChanged = false;
    }
    this.props.updateSearchQuery(id, valueChanged, checked);
  }

  toggleGenderCheck(value, checked) {
    if ((value === 'Male' || value === 'Female') && checked) {
      this.setState({
        AnyGender: false,
        [value]: true,
      });
    } else if (!checked) {
      this.setState({
        [value]: false,
      });
    }
    if ((value === 'AnyGender' && checked)) {
      this.setState({
        Female: false,
        Male: false,
        AnyGender: true,
      });
    }
    if ((value === 'Male' && this.state.Female && checked) || (value === 'Female' && this.state.Male && checked)) {
      setTimeout(() => {
        this.setState({
          Female: false,
          Male: false,
          AnyGender: true,
        });
      }, 300);
    }
  }

  addBreedToFilterState(value) {
    this.props.updateSearchQuery('breed', value, true);
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
    console.log('SEARCH STATE:', this.props);
    // reroute to search results page
    // this.setState({ getResults: true });
  }

  // onSelect(value) {
  //   console.log('onSelect', value);
  // }

  render() {
    const breedDataSource = breedList;
    if (this.state.getResults) {
      return <Redirect from="/search" to="/searchResults" />;
    }
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
                <Col span={4}><Checkbox checked={this.state.AnyGender} id="male" value="AnyGender" onChange={this.addsToFilterState}>Any</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.state.Male} id="male" value="Male" onChange={this.addsToFilterState}>Male</Checkbox></Col>
                <Col span={4}><Checkbox checked={this.state.Female} id="male" value="Female" onChange={this.addsToFilterState}>Female</Checkbox></Col>
              </Row>
            </div>
          </div>
          <div className="size-filter">
            Size
            <div className="size-list">
              <Row>
                <Col span={4}><Checkbox id="size" value="AnySize" onChange={this.addsToFilterState}>Any</Checkbox></Col>
                <Col span={4}><Checkbox id="size" value="Tiny" onChange={this.addsToFilterState}>Tiny</Checkbox></Col>
                <Col span={4}><Checkbox id="size" value="Small" onChange={this.addsToFilterState}>Small</Checkbox></Col>
                <Col span={4}><Checkbox id="size" value="Medium" onChange={this.addsToFilterState}>Medium</Checkbox></Col>
                <Col span={4}><Checkbox id="size" value="Large" onChange={this.addsToFilterState}>Large</Checkbox></Col>
                <Col span={4}><Checkbox id="size" value="Giant" onChange={this.addsToFilterState}>Giant</Checkbox></Col>
              </Row>
            </div>
          </div>
          <div className="age-filter">
            Age
            <div className="age-list">
              <Row>
                <Col span={4}><Checkbox id="lifestage" value="Anylifestage" onChange={this.addsToFilterState}>Any</Checkbox></Col>
                <Col span={4}><Checkbox id="lifestage" value="Puppy" onChange={this.addsToFilterState}>Puppy</Checkbox></Col>
                <Col span={4}><Checkbox id="lifestage" value="Adolescent" onChange={this.addsToFilterState}>Adolescent</Checkbox></Col>
                <Col span={4}><Checkbox id="lifestage" value="Adult" onChange={this.addsToFilterState}>Adult</Checkbox></Col>
                <Col span={4}><Checkbox id="lifestage" value="Senior" onChange={this.addsToFilterState}>Senior</Checkbox></Col>
              </Row>
            </div>
          </div>
        </div>
        <Button className="submit-search" onClick={this.submitData}>
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => (
  {
    params: {
      breed: search.breed,
      male: search.male,
      lifestage: search.lifestage,
      size: search.size,
    },
    results: search.results,
  }
);

export default connect(mapStateToProps, { updateSearchQuery, dogsSearch })(Search);

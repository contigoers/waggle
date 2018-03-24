import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Checkbox, Button } from 'antd';
import { forOwn, keys } from 'lodash';
import { updateSearchQuery, dogsSearch } from '../actions/searchActions';

class Search extends React.Component {
  constructor() {
    super();
    this.addsToFilterState = this.addsToFilterState.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  addsToFilterState({ target: { checked, value, id } }) {
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
    return (
      <div className="search-div">
        <div className="search-filters">
          <div className="breed-filter">
            Breed
            <div className="breed-list">
              <Row>
                <Col span={4}><Checkbox id="breed" value="AnyBreed" onChange={this.addsToFilterState}>Any</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Pug" onChange={this.addsToFilterState}>Pug</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Poodle" onChange={this.addsToFilterState}>Poodle</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Corgi" onChange={this.addsToFilterState}>Corgi</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Chihuahua" onChange={this.addsToFilterState}>Chihuahua</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Husky" onChange={this.addsToFilterState}>Husky</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Adam" onChange={this.addsToFilterState}>Adam</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="GreatDane" onChange={this.addsToFilterState}>Great Dane</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="GermanShepherd" onChange={this.addsToFilterState}>German Shepherd</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="StBernard" onChange={this.addsToFilterState}>St. Bernard</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Pitbull" onChange={this.addsToFilterState}>Pitbull</Checkbox></Col>
                <Col span={4}><Checkbox id="breed" value="Pointer" onChange={this.addsToFilterState}>Pointer</Checkbox></Col>
              </Row>
            </div>
          </div>
          <div className="gender-filter">
            Gender
            <div className="gender-list">
              <Row>
                <Col span={4}><Checkbox id="male" value="AnyGender" onChange={this.addsToFilterState}>Any</Checkbox></Col>
                <Col span={4}><Checkbox id="male" value="Male" onChange={this.addsToFilterState}>Male</Checkbox></Col>
                <Col span={4}><Checkbox id="male" value="Female" onChange={this.addsToFilterState}>Female</Checkbox></Col>
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
        {keys(this.props.results).length > 0 && (
          <Redirect from="/search" to="/searchresults" />
        )}
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

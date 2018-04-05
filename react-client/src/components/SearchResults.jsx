import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import DogCard from './DogPreviewCard';

const SearchResults = props => (
  <div className="search-results-grid" style={{ marginTop: 30 }} >
    {Object.keys(props.dogs).length ? map(props.dogs, dog => (<DogCard key={dog.id} dog={dog} />)) : 'No Results'}
  </div>
);

const mapStateToProps = state => (
  {
    dogs: state.search.results.dogs,
  }
);

export default connect(mapStateToProps, null)(SearchResults);

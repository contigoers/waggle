import React from 'react';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import DogCard from './DogPreviewCard';

const SearchResults = props => (
  <div style={{ marginTop: 30 }} >
    {!isEmpty(props.dogs) ? map(props.dogs, dog => (<DogCard key={dog.id} dog={dog} />)) : 'No Results'}
  </div>
);

const mapStateToProps = state => (
  {
    dogs: state.search.results.dogs,
  }
);

export default connect(mapStateToProps, null)(SearchResults);

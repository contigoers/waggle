import React from 'react';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import SearchResult from './SearchResult';


const SearchResults = props => (
  <div>
    {!isEmpty(props.dogs) ? map(props.dogs, dog => (<SearchResult key={dog.id} dog={dog} />)) : 'No Results'}
  </div>
);

const mapStateToProps = state => (
  {
    dogs: state.search.results.dogs,
  }
);

export default connect(mapStateToProps, null)(SearchResults);

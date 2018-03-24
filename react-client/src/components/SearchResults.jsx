import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import SearchResult from './SearchResult';


const SearchResults = props => (
  <div>
    {map(props.dogs, dog => (<SearchResult key={dog.id} dog={dog} />))}
  </div>
);

const mapStateToProps = state => ({ dogs: state.search.results.dogs });

export default connect(mapStateToProps, null)(SearchResults);

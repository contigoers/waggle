import React from 'react';
import { connect } from 'react-redux';
import { forIn } from 'lodash';
import SearchResult from './SearchResult';


const SearchResults = props => (
  <div>
    {props.dogs.map(dog => (<SearchResult key={dog.id} dog={dog} />))}
  </div>
);

const mapStateToProps = (state) => {
  const dogsArray = [];
  forIn(state.search.results.dogs, dog => dogsArray.push(dog));
  return { dogs: dogsArray };
};

export default connect(mapStateToProps, null)(SearchResults);

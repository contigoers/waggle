import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = props => (
  <div>
    {props.dogs.map(dog => // this should be props.results.data.dogs, i think
        (<SearchResult key={dog.id} dog={dog} />
        ))}
  </div>
);

// map state to props?
export default SearchResults;

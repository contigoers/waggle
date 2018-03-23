import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = props => (
  <div>
    {props.dogs.map(dog =>
        (<SearchResult key={dog.id} dog={dog} />
        ))}
  </div>
);

export default SearchResults;

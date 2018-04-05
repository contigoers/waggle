import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { map, isEmpty } from 'lodash';
import { Pagination } from 'antd';
import DogCard from './DogPreviewCard';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDogIds: [],
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.ids = Object.keys(this.props.dogs);
  }

  componentWillMount() {
    console.log(this.ids)
    this.setState({ visibleDogIds: this.ids.slice(0, 12) });
  }

  onPageChange(page, pageSize) {
    this.setState({
      visibleDogIds: this.ids.slice((page * pageSize) - 1, ((page * pageSize) - 1) + pageSize),
    });
  }

  render() {
    console.log('IDS: ', Object.keys(this.props.dogs));
    const { dogs } = this.props;
    console.log('DOGS', dogs);

    return (
      <div>
        <div className="search-results-grid" style={{ marginTop: 30 }} >
          {!isEmpty(dogs) ? map(this.state.visibleDogIds, dogId => (<DogCard key={dogs[dogId].id} dog={dogs[dogId]} />)) : 'No Results'}
        </div>
        <Pagination
          // current page = 1 on render
          defaultPageSize={12}
          total={this.ids.length}
          onChange={this.onPageChange}
        />
      </div>
    );
  }
}
=======
import { map } from 'lodash';
import DogCard from './DogPreviewCard';

const SearchResults = props => (
  <div className="search-results-grid" style={{ marginTop: 30 }} >
    {Object.keys(props.dogs).length ? map(props.dogs, dog => (<DogCard key={dog.id} dog={dog} />)) : 'No Results'}
  </div>
);
>>>>>>> f4d4d48ae192f910beca5df5d69c8f2ccfca4a5f

const mapStateToProps = state => (
  {
    dogs: state.search.results.dogs,
  }
);

export default connect(mapStateToProps, null)(SearchResults);

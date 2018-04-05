import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import { Pagination } from 'antd';
import DogCard from './DogPreviewCard';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIds: [],
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentWillMount() {
    this.setState({ visibleIds: Object.keys(this.props.dogs).slice(0, 12) });
  }

  onPageChange(page, pageSize) {
    this.setState({
      visibleIds: [Object.keys(this.props.dogs).slice((page * pageSize) - 1, ((page * pageSize) - 1) + pageSize)],
    });
  }

  render() {
    const { dogs } = this.props;
    const ids = Object.keys(this.props.dogs);
    const { visibleIds } = this.state;
    console.log(visibleIds);
    return (
      <div>
        <div className="search-results-grid" style={{ marginTop: 30 }} >
          {!isEmpty(dogs) ? map(visibleIds, dogId => (<DogCard key={dogs[dogId].id} dog={dogs[dogId]} />)) : 'No Results'}
        </div>
        <Pagination
          defaultPageSize={12}
          total={ids.length}
          onChange={this.onPageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    dogs: state.search.results.dogs,
  }
);

export default connect(mapStateToProps, null)(SearchResults);

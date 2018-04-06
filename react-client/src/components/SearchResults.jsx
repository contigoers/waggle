import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import DogCard from './DogPreviewCard';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: 0,
    };

    this.ids = Object.keys(this.props.dogs);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.ids = Object.keys(props.dogs);
  }

  handleChange(pageNum) {
    this.setState({
      curr: (pageNum - 1),
    });
  }

  render() {
    const ids = this.ids.slice(this.state.curr * 12, (this.state.curr * 12) + 12);
    const { dogs } = this.props;
    return (
      <div>
        <div className="search-results-grid" style={{ marginTop: 30 }} >
          {ids.length ? ids.map(dogId => <DogCard key={dogs[dogId].id} dog={dogs[dogId]} />) : 'No Results'}
        </div>
        <Pagination
          current={this.state.curr + 1}
          pageSize={12}
          total={this.ids.length}
          onChange={this.handleChange}
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

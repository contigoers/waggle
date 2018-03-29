import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { updatesSearchQuery } from '../../actions/searchQueryActions';
import breedList from '../../../../database/breeds';

class Breed extends React.Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
    this.changesFocusState = this.changesFocusState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changesFocusState() {
    this.setState({
      focused: !this.state.focused,
    });
  }

  handleChange(value) {
    this.props.updatesSearchQuery(value, 'breed');
  }

  render() {
    const { Option } = Select;
    const breeds = [];
    breedList.forEach((breed) => {
      breeds.push(<Option key={breed}>{breed}</Option>);
    });
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Select
        allowClear
        mode="multiple"
        placeholder="Any Breed"
        className={selectClassNames}
        onFocus={this.changesFocusState}
        onBlur={this.changesFocusState}
        onChange={this.handleChange}
      >
        {breeds}
      </Select>
    );
  }
}

const mapDispatchToProps = {
  updatesSearchQuery,
};

export default connect(null, mapDispatchToProps)(Breed);

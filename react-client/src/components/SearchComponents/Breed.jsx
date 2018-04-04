import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../../actions/searchActions';
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
    this.props.updateSearchQuery(value, 'breed');
  }

  render() {
    const { Option } = Select;
    const breeds = breedList.map(breed =>
      <Option key={breed}>{breed}</Option>);
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
  updateSearchQuery,
};

export default connect(null, mapDispatchToProps)(Breed);

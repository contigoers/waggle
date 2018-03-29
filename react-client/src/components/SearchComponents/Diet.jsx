import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { updatesSearchQuery } from '../../actions/searchQueryActions';

class Diet extends React.Component {
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
    this.props.updatesSearchQuery(value, 'diet');
  }

  render() {
    const { Option } = Select;
    const diet = [
      <Option key="1">Yes</Option>,
      <Option key="0">No</Option>,
    ];
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Select
        allowClear
        showArrow={false}
        placeholder="No Preference"
        className={selectClassNames}
        onFocus={this.changesFocusState}
        onBlur={this.changesFocusState}
        onChange={this.handleChange}
      >
        {diet}
      </Select>
    );
  }
}

const mapDispatchToProps = {
  updatesSearchQuery,
};

export default connect(null, mapDispatchToProps)(Diet);

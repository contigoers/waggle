import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { updatesSearchQuery } from '../../actions/searchQueryActions';

class Gender extends React.Component {
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
    this.props.updatesSearchQuery(value, 'gender');
  }

  render() {
    const { Option } = Select;
    const genders = [
      <Option key="1">Male</Option>,
      <Option key="0">Female</Option>,
    ];
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Select
        allowClear
        showArrow={false}
        placeholder="Any Gender"
        className={selectClassNames}
        onFocus={this.changesFocusState}
        onBlur={this.changesFocusState}
        onChange={this.handleChange}
      >
        {genders}
      </Select>
    );
  }
}

const mapDispatchToProps = {
  updatesSearchQuery,
};

export default connect(null, mapDispatchToProps)(Gender);

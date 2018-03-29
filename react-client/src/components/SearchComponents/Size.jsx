import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { updatesSearchQuery } from '../../actions/searchQueryActions';

class Size extends React.Component {
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
    this.props.updatesSearchQuery(value, 'size');
  }

  render() {
    const { Option } = Select;
    const sizes = [
      <Option key="tiny">Tiny</Option>,
      <Option key="small">Small</Option>,
      <Option key="medium">Medium</Option>,
      <Option key="large">Large</Option>,
      <Option key="huge">Huge</Option>,
    ];
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Select
        allowClear
        mode="multiple"
        placeholder="Any Size"
        className={selectClassNames}
        onFocus={this.changesFocusState}
        onBlur={this.changesFocusState}
        onChange={this.handleChange}
      >
        {sizes}
      </Select>
    );
  }
}

const mapDispatchToProps = {
  updatesSearchQuery,
};

export default connect(null, mapDispatchToProps)(Size);

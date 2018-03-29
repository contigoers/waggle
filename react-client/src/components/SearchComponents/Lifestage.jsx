import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { updatesSearchQuery } from '../../actions/searchQueryActions';

class Lifestage extends React.Component {
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
    this.props.updatesSearchQuery(value, 'lifestage');
  }

  render() {
    const { Option } = Select;
    const lifestages = [
      <Option key="puppy">Puppy</Option>,
      <Option key="adolescent">Adolescent</Option>,
      <Option key="adult">Adult</Option>,
      <Option key="large">Senior</Option>,
    ];
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Select
        allowClear
        mode="multiple"
        placeholder="Any Lifestage"
        className={selectClassNames}
        onFocus={this.changesFocusState}
        onBlur={this.changesFocusState}
        onChange={this.handleChange}
      >
        {lifestages}
      </Select>
    );
  }
}

const mapDispatchToProps = {
  updatesSearchQuery,
};

export default connect(null, mapDispatchToProps)(Lifestage);

import React from 'react';
import { Form, Select } from 'antd';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../../actions/searchActions';

class EnergyForm extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.updateSearchQuery(value, 'energy');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const energyLevels = [
      <Option key="low">Low</Option>,
      <Option key="medium">Medium</Option>,
      <Option key="high">High</Option>,
    ];
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('energy', {
        })(<Select
          allowClear
          mode="multiple"
          showArrow={false}
          placeholder="No Preference"
          className={selectClassNames}
          onFocus={this.changesFocusState}
          onBlur={this.changesFocusState}
          onChange={this.handleChange}
        >
          {energyLevels}
        </Select>)/* eslint-disable-line */}
        </Form.Item>
      </Form>
    );
  }
}
const Energy = Form.create()(EnergyForm);

const mapDispatchToProps = {
  updateSearchQuery,
};

export default connect(null, mapDispatchToProps)(Energy);

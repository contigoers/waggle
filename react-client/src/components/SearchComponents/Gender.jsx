import React from 'react';
import { Form, Select } from 'antd';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../../actions/searchActions';

class GenderForm extends React.Component {
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
    this.props.updateSearchQuery(value, 'gender');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
      <Form>
        <Form.Item>
          {getFieldDecorator('gender', {
        })(<Select
          allowClear
          showArrow={false}
          placeholder="Any Gender"
          className={selectClassNames}
          onFocus={this.changesFocusState}
          onBlur={this.changesFocusState}
          onChange={this.handleChange}
        >
          {genders}
          </Select>)/* eslint-disable-line */}
        </Form.Item>
      </Form>
    );
  }
}
const Gender = Form.create()(GenderForm);

const mapDispatchToProps = {
  updateSearchQuery,
};

export default connect(null, mapDispatchToProps)(Gender);

import React from 'react';
import { Form, Select } from 'antd';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../../actions/searchActions';

class SizeForm extends React.Component {
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
    this.props.updateSearchQuery(value, 'size');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
      <Form>
        <Form.Item>
          {getFieldDecorator('size', {
          })(<Select
            allowClear
            mode="multiple"
            placeholder="Any Size"
            className={selectClassNames}
            onFocus={this.changesFocusState}
            onBlur={this.changesFocusState}
            onChange={this.handleChange}
          >
            {sizes}
          </Select>)/* eslint-disable-line */}
        </Form.Item>
      </Form>
    );
  }
}
const Size = Form.create()(SizeForm);

const mapDispatchToProps = {
  updateSearchQuery,
};

export default connect(null, mapDispatchToProps)(Size);

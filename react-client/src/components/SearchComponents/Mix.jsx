import React from 'react';
import { Select, Form } from 'antd';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../../actions/searchActions';

class MixForm extends React.Component {
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
    this.props.updateSearchQuery(value, 'mix');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const mixed = [
      <Option key="1">Yes</Option>,
      <Option key="0">No</Option>,
    ];
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('mix', {
          })(<Select
            allowClear
            showArrow={false}
            placeholder="No Preference"
            className={selectClassNames}
            onFocus={this.changesFocusState}
            onBlur={this.changesFocusState}
            onChange={this.handleChange}
          >
            {mixed}
             </Select>)/* eslint-disable-line */}
        </Form.Item>
      </Form>
    );
  }
}
const Mix = Form.create()(MixForm);

const mapDispatchToProps = {
  updateSearchQuery,
};

export default connect(null, mapDispatchToProps)(Mix);

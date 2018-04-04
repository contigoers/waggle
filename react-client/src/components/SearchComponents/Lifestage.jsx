import React from 'react';
import { Select, Form } from 'antd';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../../actions/searchActions';

class LifestageForm extends React.Component {
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
    this.props.updateSearchQuery(value, 'lifestage');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
      <Form>
        <Form.Item>
          {getFieldDecorator('lifestage', {
          })(<Select
            allowClear
            mode="multiple"
            placeholder="Any Lifestage"
            className={selectClassNames}
            onFocus={this.changesFocusState}
            onBlur={this.changesFocusState}
            onChange={this.handleChange}
          >
            {lifestages}
          </Select>)/* eslint-disable-line */}
        </Form.Item>
      </Form>
    );
  }
}
const Lifestage = Form.create()(LifestageForm);

const mapDispatchToProps = {
  updateSearchQuery,
};

export default connect(null, mapDispatchToProps)(Lifestage);

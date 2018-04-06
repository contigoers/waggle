import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Radio, Button } from 'antd';
import { PhoneNumberUtil } from 'google-libphonenumber';
import axios from 'axios';

import states from '../assets/states';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const phoneUtil = PhoneNumberUtil.getInstance();

const Callback = Form.create()(class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      phoneDirty: false,
      numberIsValid: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.setState({ phoneDirty: true });
      if (!err && this.state.numberIsValid) {
        console.log('Received values of form: ', values);
        axios.patch('/auth/facebook', { ...values, id: this.props.user.id });
      }
    });
  }

  handleBlur({ target: { id, value } }) {
    const key = `${id}Dirty`;
    this.setState({ [key]: this.state[key] || !!value });
  }

  validateNumber(rule, value, callback) {
    if (!value) {
      callback('phone is required');
      return;
    }
    const number = phoneUtil.parseAndKeepRawInput(value, 'US');
    const numberIsValid = phoneUtil.isValidNumber(number);
    this.setState({
      numberIsValid,
    });
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '1',
    })(<Select style={{ width: 70 }}>
      <Option value="1">+1</Option>
    </Select>); // eslint-disable-line

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please enter your E-mail!',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Username"
        >
          {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please enter a username!',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
          validateStatus={!this.state.numberIsValid && this.state.phoneDirty ? 'error' : null}
          help={!this.state.numberIsValid && this.state.phoneDirty ? 'Please enter a valid phone number' : null}
        >
          {getFieldDecorator('phone', {
            rules: [{
              required: true, validator: this.validateNumber,
            }],
          })(<Input
            onChange={this.handleChange}
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
            onBlur={this.handleBlur}
          />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Street Address"
        >
          {getFieldDecorator('address', {
              rules: [{
                required: true,
                message: 'Please enter your street address!',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="City"
        >
          {getFieldDecorator('city', {
              rules: [{
                required: true,
                message: 'Please enter your city!',
              }],
              })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="State"
        >
          {getFieldDecorator('state', {
              rules: [{
                required: true,
                message: 'Please enter your state!',
              }],
              })(<Select
                style={{ width: 120 }}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                optionFilterProp="children"
                showSearch
              >
                {states.map(state => <Option key={state} value={state}>{state}</Option>)}
              </Select>) /* eslint-disable-line */}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="ZIP Code"
        >
          {getFieldDecorator('zipcode', {
              rules: [{
                required: true,
                message: 'Please enter your city!',
              }, {
                pattern: '[0-9]{5}',
                message: 'Please enter a five-digit ZIP!',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Do you have other pets?"
        >
          {getFieldDecorator('pets', {
              rules: [{
                required: true,
                message: 'Please choose an option!',
              }],
            })(<RadioGroup style={{ width: '100%' }}>
              <Radio value="yes">yes</Radio>
              <Radio value="no">no</Radio>
            </RadioGroup>) /* eslint-disable-line */}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Living arrangement:"
        >
          {getFieldDecorator('house', {
              rules: [{
                required: true,
                message: 'Please choose an option!',
              }],
            })(<RadioGroup style={{ width: '100%' }}>
              <Radio value="house">house</Radio>
              <Radio value="apartment">apartment</Radio>
              <Radio value="other">other</Radio>
            </RadioGroup>) /* eslint-disable-line */}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
});

const mapStateToProps = state => ({ user: state.storeUser.user });

export default connect(mapStateToProps, null)(Callback);

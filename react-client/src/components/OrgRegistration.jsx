import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { PhoneNumberUtil } from 'google-libphonenumber';

import states from '../assets/states';

const FormItem = Form.Item;
const { Option } = Select;
const phoneUtil = PhoneNumberUtil.getInstance();

const WrappedOrgRegistration = Form.create()(class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      phoneDirty: false,
      numberIsValid: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
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

  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('The two passwords do not match!');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '1',
    })(<Select style={{ width: 70 }}>
      <Option value="1">+1</Option>
    </Select>); // eslint-disable-line

    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not a valid email address.',
              }, {
                required: true, message: 'Please enter your email!',
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
          label="Password"
        >
          {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please enter your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(<Input type="password" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(<Input type="password" onBlur={this.handleBlur} />)}
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
          label="Organization Name"
        >
          {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: 'Please enter your name!',
              }],
            })(<Input />)}
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
                message: 'Please enter your five-digit ZIP!',
              }],
            })(<Input />)}
        </FormItem>
      </Form>
    );
  }
});

export default WrappedOrgRegistration;

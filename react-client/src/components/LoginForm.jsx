import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

const WrappedHorizontalLoginForm = Form.create()(class LoginForm extends Component {
  static hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/login', values);
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: 'Please input your username!',
          }],
          })(<Input
            prefix={<Icon
              type="user"
              style={{ color: 'rgba(0,0,0,.25)' }}
            />}
            placeholder="Username"
          />)}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Please input your Password!',
          }],
          })(<Input
            prefix={<Icon
              type="lock"
              style={{ color: 'rgba(0,0,0,.25)' }}
            />}
            type="password"
            placeholder="Password"
          />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={LoginForm.hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
});

export default WrappedHorizontalLoginForm;

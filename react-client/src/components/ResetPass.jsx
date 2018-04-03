import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class ResetPass extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.put('/resetpass', {
          password: values.password1,
          token: window.location.href.split('/').pop(),
        })
          .then(res => console.log(res.data))
          .catch(error => console.log(error));
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="reset-pass">
        <div style={{ textAlign: 'center', marginBottom: 25, fontSize: 30 }}>
          Reset Password
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('password1', {
              rules: [{ required: true, message: 'Please enter a password!' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password2', {
              rules: [{ required: true, message: 'Please confirm your Password!' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />)}
          </FormItem>
          <FormItem className="reset-password-buttons">
            <a href="/">Go back home</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Reset
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(ResetPass);

export default WrappedNormalLoginForm;

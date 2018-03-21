/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Modal,
} from 'antd';

import { toggleRegistrationModal } from '../actions/registrationActions';

const FormItem = Form.Item;
const { Option } = Select;

const WrappedAdopterRegistration = Form.create()(class AdopterRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
    };

    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
  }

  handleConfirmBlur({ target: { value } }) {
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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
      initialValue: '86',
    })(<Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>);

    return (
      <Modal
        id="adopter"
        title="Register as an Adopter"
        visible={this.props.adopter}
        onCancel={this.props.toggleRegistrationModal}
        footer={[
          <Button key="back" onClick={this.props.toggleRegistrationModal}>Cancel</Button>,
          <Button key="register" type="primary" onClick={this.props.onSubmit}>
            Register
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
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
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(<Checkbox>I have read the <a href="">agreement</a></Checkbox>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
});

const mapStateToProps = ({ registrationModal: { adopter, org } }) => (
  {
    org,
    adopter,
  }
);

export default connect(mapStateToProps, { toggleRegistrationModal })(WrappedAdopterRegistration);

// sign up w/ facebook option

// all users
//   username : string
//   password : string
//   password confirm : string
//   email address : string (verify?)
//   street address : string
//   city : string
//   zipcode : number
//   phone # : numeric?
//   organization/adopter: drop down

// render on adopter signup
//   name : string
//   has pets : checkbox boolean
//   home type : drop down (house, apartment, other)

// render on organization signup
//   org name

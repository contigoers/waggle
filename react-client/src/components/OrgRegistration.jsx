import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Modal } from 'antd';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { toggleRegistrationModal } from '../actions/registrationActions';

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
      phone: '',
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
  }

  handleBlur({ target: { id, value } }) {
    const key = `${id}Dirty`;
    this.setState({ [key]: this.state[key] || !!value });
  }

  handleChange({ target: { value, id } }) {
    if (id === 'phone') {
      const number = phoneUtil.parseAndKeepRawInput(value, 'US');
      this.setState({
        numberIsValid: phoneUtil.isValidNumber(number),
        phone: value,
      });
    } else {
      this.setState({
        [id]: value,
      });
    }
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

  toggleModal() {
    this.props.toggleRegistrationModal('org');
  }

  handleSubmit() {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      this.setState({ phoneDirty: true });
      if (!err && this.state.numberIsValid) {
        this.setState({ phone: '', phoneDirty: false });
        console.log('Received values of org form: ', values);
        form.resetFields();
        this.toggleModal();
      }
    });
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
      <Modal
        id="org"
        title="Register as an Organization"
        visible={this.props.org}
        onCancel={this.toggleModal}
        footer={[
          <Button key="back" onClick={this.toggleModal}>Cancel</Button>,
          <Button id="org" key="register" type="primary" onClick={this.handleSubmit}>
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
                  required: true, message: 'Please enter your E-mail!',
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
            <Input
              value={this.state.phone}
              onChange={this.handleChange}
              id="phone"
              onBlur={this.handleBlur}
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
            />
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
            label="ZIP Code"
          >
            {getFieldDecorator('zip', {
                rules: [{
                  required: true,
                  message: 'Please enter your city!',
                }, {
                  pattern: '[0-9]{5}',
                  message: 'Please enter a five-digit ZIP!',
                }],
              })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
});

const mapStateToProps = ({ registrationModal: { org } }) => (
  {
    org,
  }
);

export default connect(mapStateToProps, { toggleRegistrationModal })(WrappedOrgRegistration);

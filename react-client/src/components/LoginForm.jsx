import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Modal } from 'antd';
import axios from 'axios';

import { toggleLoginModal, storeUserId } from '../actions/loginActions';

const FormItem = Form.Item;

const WrappedLoginForm = Form.create()(class extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.props.toggleLoginModal.bind(this);
    this.storeUser = storeUserId.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/login', values).then((response) => {
          console.log(response.data.user);
          this.toggleModal();
          this.storeUser({ user: response.data.user });
        });
        this.props.form.resetFields();
        // this.toggleModal();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        id="login"
        title="Please Log In"
        visible={this.props.visible}
        onCancel={this.toggleModal}
        footer={[
          <Button key="back" onClick={this.toggleModal}>Cancel</Button>,
          <Button id="login" key="login" type="primary" onClick={this.handleSubmit}>
            Log In
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onKeyUp={(e) => { if (e.key === 'Enter') this.handleSubmit(e); }}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onKeyUp={(e) => { if (e.key === 'Enter') this.handleSubmit(e); }}
              type="password"
              placeholder="Password"
            />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
});

const mapStateToProps = ({ loginModal: { visible } }) => (
  {
    visible,
  }
);

export default connect(mapStateToProps, { toggleLoginModal })(WrappedLoginForm);

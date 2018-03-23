import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { toggleLoginModal } from '../actions/loginActions';

const FormItem = Form.Item;

const WrappedLoginForm = Form.create()(class extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.props.toggleLoginModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input
              prefix={<Icon
                type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
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

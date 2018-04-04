import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class InquiryForm extends Component {
  constructor(props) {
    super(props);

    const { name } = this.props.results.dogs[this.props.dogId];

    this.message = `Hi! I'm contacting you about ${name}...`;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { orgs } = this.props.results;
    console.log(orgs[this.props.orgId])
    return (
      <Form>
        <FormItem label="To:">
          {getFieldDecorator('recipient', {
            initialValue: orgs[this.props.orgId].org_name,
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="From:">
          {getFieldDecorator('sender', {
            initialValue: this.props.user.username,
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="Message:">
          {getFieldDecorator('message', {
            initialValue: this.message,
          })(<TextArea />)}
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = ({ storeUser, search }) => (
  {
    user: storeUser.user,
    results: search.results,
  }
);

export default connect(mapStateToProps, null)(Form.create()(InquiryForm));

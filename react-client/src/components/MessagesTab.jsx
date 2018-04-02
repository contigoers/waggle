import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, List, Icon, Card } from 'antd';

import { getContacts, getMessages } from '../actions/messagingActions';


const userStyle = {
  marginTop: '15',
  border: '1px #872320 solid',
  backgroundColor: '#ffeded',
};
const contactStyle = {
  marginTop: '15',
  border: '1px #1a4672 solid',
  backgroundColor: '#edf6ff',
};

class MessagesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentContact: null };
    this.getContacts = this.props.getContacts.bind(this);
    this.getMessages = this.props.getMessages.bind(this);
    this.renderMessageFeed = this.renderMessageFeed.bind(this);
    this.renderContactsList = this.renderContactsList.bind(this);
  }

  async renderMessageFeed(e) {
    const { name } = e.target.dataset;
    await this.getMessages(this.props.user.id, e.target.id);
    this.setState({ currentContact: name });
  }

  renderContactsList() {
    this.setState({ currentContact: null });
  }

  render() {
    console.log('rendering', this.props, this.state);
    if (this.state.currentContact) {
      if (this.props.messages) {
        return (
          <div>
            <Row>
              <div role="link" tabIndex={0} onClick={this.renderContactsList}> Return to contacts list </div>
            </Row>
            <Row>
              <Col span={12} offset={3}>
                <div>
                  {
                    this.props.messages.map(message => (
                      <Card
                        key={message.id}
                        style={message.sender_id === this.props.user.id ? userStyle : contactStyle}
                        title={message.sender_id === this.props.user.id ?
                          this.props.user.name : this.state.currentContact}
                        extra={<span style={{ fontSize: 'smaller' }} role="button"> Delete </span>}
                      >
                        <div> {message.message} </div>
                        <div style={{ fontSize: 'smaller' }} > {message.sent} </div>
                      </Card>
                      ))
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <div role="link" tabIndex={0} onClick={this.renderContactsList}> Return to contacts list </div>
            </Row>
          </div>
        );
      }
      return (<div> Loading... </div>);
    }
    if (this.props.contacts) {
      return (
        <List
          itemLayout="horizontal"
          dataSource={this.props.contacts}
          renderItem={contact => (
            <List.Item>
              <List.Item.Meta
                avatar={<Icon type="mail" />}
                title={<div id={contact.id} data-name={contact.name} tabIndex={contact.id} role="link" style={{ color: 'green' }} onClick={this.renderMessageFeed}>{contact.name}</div>}
                description={contact.dogs.join(', ')}
              />
            </List.Item>)
          }
        />
      );
    }
    return (<div> Loading... </div>);
  }
}

const mapStateToProps = ({ fetchContacts, fetchMessages, storeUser }) => ({
  user: storeUser.user,
  contacts: fetchContacts.contacts,
  messages: fetchMessages.messages,
});

const mapDispatchToProps = {
  getContacts,
  getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesTab);


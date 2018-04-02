import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, List, Icon, Card, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import { getContacts, getMessages } from '../actions/messagingActions';


const userStyle = {
  marginTop: '15px',
  border: '1px #872320 solid',
  backgroundColor: '#ffeded',
};
const contactStyle = {
  marginTop: '15px',
  border: '1px #1a4672 solid',
  backgroundColor: '#edf6ff',
};
const infiniteStyle = {
  border: '1px solid black',
  overflow: 'auto',
  padding: '8px 24px',
  height: '300px',
};

class MessagesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContact: null,
      visibleContacts: this.props.contacts.slice(0, 5),
      visibleMessages: [],
      loading: false,
      hasMore: true,
    };
    this.getContacts = this.props.getContacts.bind(this);
    this.getMessages = this.props.getMessages.bind(this);
    this.renderMessageFeed = this.renderMessageFeed.bind(this);
    this.renderContactsList = this.renderContactsList.bind(this);
    this.handleInfiniteMessagesOnLoad = this.handleInfiniteMessagesOnLoad.bind(this);
    this.handleInfiniteContactsOnLoad = this.handleInfiniteContactsOnLoad.bind(this);
  }

  handleInfiniteMessagesOnLoad() {
    console.log('handle infinite messages on load');
    this.setState({ loading: true });
    if (this.state.visibleMessages.length >= this.props.messages.length) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    console.log('setting state');
    this.setState({
      visibleMessages: this.props.messages.slice(0, this.state.visibleMessages.length + 5),
      loading: false,
    });
  }

  handleInfiniteContactsOnLoad() {
    console.log('handle infinite contacts on load');
    this.setState({ loading: true });
    if (this.state.visibleContacts.length >= this.props.contacts.length) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    console.log('setting state');
    this.setState({
      visibleContacts: this.props.contacts.slice(0, Math.min(this.props.contacts.length, this.state.visibleContacts.length + 5)),
      loading: false,
    });
  }

  renderContactsList() {
    this.setState({
      currentContact: null,
      visibleContacts: this.props.contacts.slice(0, 5),
    });
  }

  async renderMessageFeed(e) {
    const { name } = e.target.dataset;
    await this.getMessages(this.props.user.id, e.target.id);
    this.setState({
      currentContact: name,
      visibleMessages: this.props.messages.slice(0, 5),
    });
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
                    this.state.visibleMessages.map(msg => (
                      <Card
                        key={msg.id}
                        style={msg.sender_id === this.props.user.id ? userStyle : contactStyle}
                        title={msg.sender_id === this.props.user.id ?
                          this.props.user.name : this.state.currentContact}
                        extra={<span style={{ fontSize: 'smaller' }} role="button"> Delete </span>}
                      >
                        <div> {msg.message} </div>
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
        <div style={infiniteStyle}>
          <InfiniteScroll
            //initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteContactsOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={this.state.visibleContacts}
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
          </InfiniteScroll>
        </div>
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


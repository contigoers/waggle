import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, List, Icon, Card, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

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
    this.state = {
      currentContact: null,
      visibleContacts: this.state.contacts.slice(0, 10),
      visibleMessages: this.state.messages.slice(0, 10),
      loading: false,
      hasMore: true,
    };
    this.getContacts = this.props.getContacts.bind(this);
    this.getMessages = this.props.getMessages.bind(this);
    this.renderMessageFeed = this.renderMessageFeed.bind(this);
    this.renderContactsList = this.renderContactsList.bind(this);
  }

  handleInfiniteMessagesOnLoad() {
    this.setState({ loading: true });
    if (this.state.visibleMessages.length > this.props.messages.length) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.setState({
      visibleMessages: this.props.messages.slice(0, this.state.visibleMessages.length + 5),
      loading: false,
    });
  }

  renderContactsList() {
    this.setState({ currentContact: null });
  }

  async renderMessageFeed(e) {
    const { name } = e.target.dataset;
    await this.getMessages(this.props.user.id, e.target.id);
    this.setState({ currentContact: name });
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
        <div>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteMessagesOnLoad}
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


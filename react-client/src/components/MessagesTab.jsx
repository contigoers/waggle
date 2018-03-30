import React from 'react';
import { connect } from 'react-redux';

import MessageFeed from './MessageFeed';
import ContactsList from './ContactsList';

class MessagesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMessages: false };
    this.renderMessages = this.renderMessages.bind(this);
    this.renderContactsList = this.renderContactsList.bind(this);
  }

  componentDidMount() {
    // sets store contacts to this user's contacts (get request for contacts)
    this.setState({ showMessages: false });
  }

  renderMessageFeed() {
    // sets store messages to messages from ids?
    // sets state to true
    this.setState({ showMessages: true });
  }

  renderContactsList() {
    // sets state to false
  }

  render() {
    if (this.state.showMessages) {
      return (<MessageFeed />);
    }
    return (<ContactsList />);
  }
}

const mapStateToProps = ({ fetchMessages, fetchContacts }) => ({
  messages: null,
  contacts: null,
});

export default connect(mapStateToProps, null)(MessagesTab);

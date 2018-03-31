import React from 'react';
import { connect } from 'react-redux';
import { List, Icon } from 'antd';

// import MessageFeed from './MessageFeed';
// import ContactsList from './ContactsList';

import { getContacts, getMessages } from '../actions/messagingActions';


// const userStyle = {
//   border: '1px blue solid',
// };
// const contactStyle = {
//   border: '1px green solid',
// };

// const Message = (msg) => {
//   // const { user } = this.props;
//   // const { message } = msg;
//   // const { contact } = msg;
//   // const isMine = user.id === message.sender_id;
//   return (
//     <div> this is a message </div>
//   )
//   // return (
//   //   <div style={isMine ? userStyle : contactStyle}>
//   //     <div>
//   //       <span style={{ float: 'left' }} > { isMine ? user.name : contact.name } ( {message.timestamp} ): </span>
//   //       { isMine && <a href="/delete" style={{ float: 'right' }} > Delete </a>}
//   //     </div>
//   //     <div> {message.message} </div>
//   //   </div>
//   // );
// };

const sampleData = [
  { id: 1, name: 'krisha', dogs: ['fido', 'lucky', 'sammy'] },
  { id: 2, name: 'shannon', dogs: ['tractor', 'robot', 'kitty'] },
];

class MessagesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMessages: false };
    this.getContacts = this.props.getContacts.bind(this);
    this.getMessages = this.props.getMessages.bind(this);
    this.renderMessageFeed = this.renderMessageFeed.bind(this);
    this.renderContactsList = this.renderContactsList.bind(this);
  }

  async componentDidMount() {
    // sets store contacts to this user's contacts (get request for contacts)
    //await this.getContacts(this.props.user.id); // store should have page rerender
    //console.log('abcdefg', this.props)

  }

  renderMessageFeed() {
    // sets store messages to messages from ids?
    // sets state to true
    //this.setState({ showMessages: true });
    console.log('click')
  }
  
  renderContactsList() {
    // sets state to false
    this.setState({ showMessages: false });
  }

  render() {
    console.log('rendering', this.props)
    // props has user, contacts, messages, getcontacts, getmessages (excellent)
    if (this.state.showMessages) {
      if (this.props.messages) {
        return (
          <div>
            <div role="link" tabIndex={0} onClick={this.renderContactsList}> Return to contacts list </div>
            <div>
              {
                // props.messages.map(message => (
                // <Message message={message} />
                //   ))
                }
            </div>
            <div role="link" tabIndex={0} onClick={this.renderContactsList}> Return to contacts list </div>
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
                title={<span tabIndex={contact.id} role="link" style={{ color: 'green' }} onClick={this.renderMessageFeed}>{contact.name}</span>}
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


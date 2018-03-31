import React from 'react';
import { connect } from 'react-redux';

import { List, Icon } from 'antd';

import { getMessages } from '../actions/messagingActions';


const sampleData = [
  { id: 1, name: 'krisha', dogs: ['fido', 'lucky', 'sammy'] },
  { id: 2, name: 'shannon', dogs: ['tractor', 'robot', 'kitty'] },
];

class ContactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state={something: 'placeholder'}
  }



  render() {
    console.log(this.props);
    return (
      <List
        itemLayout="horizontal"
        dataSource={sampleData}
        renderItem={contact => (
          <List.Item>
            <List.Item.Meta
              avatar={<Icon type="mail" />}
              title={<span tabIndex={contact.id} role="link" style={{ color: 'green' }} onClick={this.onClick()}>{contact.name}</span>}
              description={contact.dogs.join(', ')}
            />
          </List.Item>
        )}
      />
    );
  }
}


const mapStateToProps = ({ fetchContacts, fetchMessages }) => ({
  contacts: fetchContacts.contacts,
  messages: fetchMessages.messages,
});

const mapDispatchToProps = {
  getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);

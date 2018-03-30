import React from 'react';
import { connect } from 'react-redux';

import { List, Icon } from 'antd';

import { getContacts } from '../actions/messagingActions';


const sampleData = [
  { id: 1, name: 'krisha', dogs: ['fido', 'lucky', 'sammy'] },
  { id: 2, name: 'shannon', dogs: ['tractor', 'robot', 'kitty'] },
];

class ContactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMessages: false };
    this.onClick = this.onClick.bind(this);
    this.getContacts = this.props.getContacts.bind(this);
  }

  componentDidMount() {
    // call getContacts which should update state.contacts to list of contacts and dogs
    this.getContacts({ id: this.props.user.id });
  }

  onClick() {
    // sets state to show message
    this.setState({ showMessages: true });
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
              title={<span tabIndex={contact.id} role="link" style={{ color: 'blue' }} onClick={this.onClick}>{contact.name}</span>}
              description={contact.dogs.join(', ')}
            />
          </List.Item>
        )}
      />
    );
  }
}


const mapStateToProps = ({ fetchContacts, storeUser }) => ({
  contacts: fetchContacts.contacts,
  user: storeUser.user,
});

const mapDispatchToProps = {
  getContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);

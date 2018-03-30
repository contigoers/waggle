import React from 'react';

const Message = (props) => {
  const { user } = props;
  const { message } = props;
  const { contact } = props.message;
  const isMine = user.id === message.sender_id;
  const userStyle = {
    border: '1px blue solid',
  };
  const contactStyle = {
    border: '1px green solid',
  };
  return (
    <div style={isMine ? userStyle : contactStyle}>
      <div>
        <span style={{ float: 'left' }} > { isMine ? user.name : contact.name } ( {message.timestamp} ): </span>
        { isMine && <a href="/delete" style={{ float: 'right' }} > Delete </a>}
      </div>
      <div> {message.message} </div>
    </div>
  );
};

const MessageFeed = props => (
  <div>
    {props.messages.map(message => (
      <Message message={message} />
        ))}
  </div>
);

export default MessageFeed;

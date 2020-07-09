import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const getMessage = (state) => state.messages;
const getCurrentChannel = (state) => state.currentChannelId;

const MessageList = () => {
  const messages = useSelector(getMessage);
  const currentChannelId = useSelector(getCurrentChannel);
  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <>
      {filteredMessages.map(({ id, message }) => <Message key={id} message={message} />)}
    </>
  );
};

export default MessageList;

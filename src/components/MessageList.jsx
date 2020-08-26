import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const getMessage = (state) => state.messages;
const getCurrentChannel = (state) => state.currentChannelId;

const MessageList = () => {
  const messages = useSelector(getMessage);
  const currentChannelId = useSelector(getCurrentChannel);
  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const inputRef = useRef(null);

  return (
    <div ref={inputRef} className="d-flex flex-column-reverse flex-grow-1 overflow-auto p-3">
      {filteredMessages.reverse().map(({ id, message }) => <Message key={id} message={message} />)}
    </div>
  );
};

export default MessageList;

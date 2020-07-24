import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Message from './Message';

const getMessage = (state) => state.messages;
const getCurrentChannel = (state) => state.currentChannelId;

const MessageList = ({ classes }) => {
  const messages = useSelector(getMessage);
  const currentChannelId = useSelector(getCurrentChannel);
  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const inputRef = useRef(null);

  const className = cn({
    [classes]: true,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTo({
        top: inputRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  });

  return (
    <div ref={inputRef} className={className}>
      {filteredMessages.map(({ id, message }) => <Message key={id} message={message} />)}
    </div>
  );
};

export default MessageList;

import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Message = ({ message }) => {
  const { text, data, name } = message;

  return (
    <div className="pb-3">
      <strong>
        {`${name} :`}
      </strong>
      <div>{ text }</div>
      <small className="text-info">
        {formatDistanceToNow(new Date(data), { addSuffix: true })}
      </small>
    </div>
  );
};

export default Message;

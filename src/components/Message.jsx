import React from 'react';
import { format } from 'date-fns';

const Message = ({ message }) => {
  const { text, date, name } = message;
  return (
    <div className="mb-3">
      <span className="font-weight-bold">
        {`${name} :`}
      </span>
      <div className="text-info ext-wrap text-break">{ text }</div>
      <small>
        {format(new Date(date), 'yy/MMMM/dd HH:mm:ss')}
      </small>
    </div>
  );
};

export default Message;

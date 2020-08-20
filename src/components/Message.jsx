import React from 'react';
import { format } from 'date-fns';
import cn from 'classnames';

const Message = ({ message, classes }) => {
  const className = cn(
    { classes },
    'pb-3',
    'text-wrap',
    'text-break',
  );

  const { text, date, name } = message;
  return (
    <div className={className}>
      <span className="font-weight-bold">
        {`${name} :`}
      </span>
      <div>{ text }</div>
      <small className="text-info">
        {format(new Date(date), 'yy/MMMM/dd HH:mm:ss')}
      </small>
    </div>
  );
};

export default Message;

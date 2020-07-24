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

  const { text, data, name } = message;
  return (
    <div className={className}>
      <strong>
        {`${name} :`}
      </strong>
      <div>{ text }</div>
      <small className="text-info">
        {format(new Date(data), 'yy/MMMM/dd HH:mm:ss')}
      </small>
    </div>
  );
};

export default Message;

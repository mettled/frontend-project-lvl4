import React, { useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices';
import UserContext from '../context';

const getChannelsInfo = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(getChannelsInfo);
  const userName = useContext(UserContext);
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const handleChangeChannel = (id) => () => {
    dispatch(actions.changeCurrentChannel({ id }));
  };

  const handleShowModal = () => {
    dispatch(actions.showModal('addChannel'));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTo({
        top: inputRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, [channels]);

  return (
    <>
      <div className="p-3">
        {`${t('greeting')}: ${userName}`}
      </div>
      <hr />
      <div ref={inputRef} className="d-flex flex-column overflow-auto">
        {
          channels.map(({ id, name }) => {
            const classes = cn(
              'btn',
              currentChannelId === id ? 'btn-light active' : 'btn-link text-white',
            );
            return <button type="button" className={classes} key={id} onClick={handleChangeChannel(id)}>{`# ${name}`}</button>;
          })
        }
      </div>
      <button type="button" className="btn btn-primary mt-3" onClick={handleShowModal}>{t('buttons.addChannel')}</button>
    </>
  );
};

export default ChannelsBox;

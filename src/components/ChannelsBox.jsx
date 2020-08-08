import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { changeCurrentChannel } from '../slices/currentChannelId';
import { showModal } from '../slices/modal';
import UserContext from '../context';

const getChannels = (state) => state.channels;
const getCurrentChannel = (state) => state.currentChannelId;

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannel);
  const userName = useContext(UserContext);
  const { t } = useTranslation();

  const handleChangeChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel({ id }));
  };

  return (
    <>
      <div className="p-3">
        {`${t('greatting')}: ${userName}`}
      </div>
      <hr />
      {
        channels.map(({ id, name }) => {
          const classes = cn('btn', {
            'btn-light active': currentChannelId === id,
            'btn-link text-white': currentChannelId !== id,
          });
          return <button type="button" className={classes} key={id} onClick={handleChangeChannel(id)}>{`# ${name}`}</button>;
        })
      }
      <button type="button" className="btn btn-primary mt-3" onClick={() => dispatch(showModal('addChannel'))}>{t('buttons.addChannel')}</button>
    </>
  );
};

export default ChannelsBox;

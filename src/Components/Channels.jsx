import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannel } from '../slices/channels';
import { showModal } from '../slices/modal';
import UserContext from './context';

const getChannels = (state) => state.channels;
const getCurrentChannel = (state) => state.currentChannelId;

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannel);
  const userName = useContext(UserContext);
  const { t } = useTranslation();

  const handlerChangeChennel = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel({ id }));
  };

  return (
    <>
      <div className="p-3">
        {`${t('greatting')}:  ${userName}`}
      </div>
      <hr />
      {
        channels.map(({ id, name }) => {
          const cl = currentChannelId === id ? 'btn btn-light active' : 'btn btn-link text-white';
          return <button type="button" className={cl} key={id} onClick={handlerChangeChennel(id)}>{`# ${name}`}</button>;
        })
      }
      <button type="button" className="btn btn-primary mt-3" onClick={() => dispatch(showModal('addChannel'))}>{t('buttons.addChannel')}</button>
    </>
  );
};

export default Channels;

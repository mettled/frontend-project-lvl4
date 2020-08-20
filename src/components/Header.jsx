import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices';

const getNameChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const Header = () => {
  const { name, removable } = useSelector(getNameChannel);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <div className="font-weight-bold h3">
        {`# ${name}`}
      </div>
      {
        removable
        && (
          <div>
            <button type="button" className="btn btn-danger mr-3" onClick={() => dispatch(actions.showModal('removeChannel'))}>{t('buttons.removeChannel')}</button>
            <button type="button" className="btn btn-primary" onClick={() => dispatch(actions.showModal('renameChannel'))}>{t('buttons.renameChannel')}</button>
          </div>
        )
      }
    </>
  );
};

export default Header;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices';

const getChannelName = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const Header = () => {
  const { name, removable } = useSelector(getChannelName);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleShowRemoveModal = () => {
    dispatch(actions.showModal('removeChannel'));
  };

  const handleShowRenameModal = () => {
    dispatch(actions.showModal('renameChannel'));
  };

  return (
    <>
      <div className="font-weight-bold h3">
        {`# ${name}`}
      </div>
      {
        removable
        && (
          <div>
            <button type="button" className="btn btn-danger mr-3" onClick={handleShowRemoveModal}>{t('buttons.removeChannel')}</button>
            <button type="button" className="btn btn-primary" onClick={handleShowRenameModal}>{t('buttons.renameChannel')}</button>
          </div>
        )
      }
    </>
  );
};

export default Header;

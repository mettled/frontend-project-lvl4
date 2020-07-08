import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import className from 'classnames';
import { showModal } from '../slices/modal';

const getNameChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const Header = () => {
  const { name, removable } = useSelector(getNameChannel);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const btnClassRemove = className({
    'btn btn-danger mr-3': true,
    invisible: !removable,
  });

  const btnClassRename = className({
    'btn btn-primary': true,
    invisible: !removable,
  });

  return (
    <>
      <div className="font-weight-bold h3">
        {`# ${name}`}
      </div>
      <div>
        <button type="button" className={btnClassRemove} onClick={() => dispatch(showModal('removeChannel'))}>{t('buttons.removeChannel')}</button>
        <button type="button" className={btnClassRename} onClick={() => dispatch(showModal('renameChannel'))}>{t('buttons.renameChannel')}</button>
      </div>
    </>
  );
};

export default Header;

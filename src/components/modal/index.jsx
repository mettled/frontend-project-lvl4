import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const getModal = (state) => state.modal;

const Modals = () => {
  const currentModal = useSelector(getModal);
  if (!currentModal) {
    return null;
  }
  const Component = modals[currentModal];
  return <Component />;
};

export default Modals;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddChannel from './addChannel.jsx';
import RemoveChannel from './removeChannel.jsx';
import RenameChannel from './renameChannel.jsx';

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

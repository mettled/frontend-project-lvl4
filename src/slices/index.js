import { combineReducers } from 'redux';
import channels, { actions as channelsActions } from './channels';
import currentChannelId, { actions as currentChannelIdActions } from './currentChannelId';
import messages, { actions as messagesActions } from './messages';
import modal, { actions as modalActions } from './modal';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  modal,
});

export const actions = {
  ...currentChannelIdActions,
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

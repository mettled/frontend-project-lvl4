import { combineReducers } from 'redux';
import channels from './channels';
import currentChannelId from './currentChannelId';
import messages from './messages';
import modal from './modal';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  modal,
});

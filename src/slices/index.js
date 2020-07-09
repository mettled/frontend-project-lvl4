import { combineReducers } from 'redux';
import channels from './channels';
import messages from './messages';
import modal from './modal';

export default combineReducers({
  ...channels,
  messages,
  modal,
});

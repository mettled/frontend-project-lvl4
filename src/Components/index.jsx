import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import io from 'socket.io-client';
import cookies from 'js-cookie';
import rootRedusers from '../slices';
import App from './App';
import { addChannel, removeChannel, renameChannel } from '../slices/channels';
import { addMessage } from '../slices/messages';
import UserContext from './context';

export default (gon) => {
  const { channels, messages, currentChannelId } = gon;
  const userName = cookies.get('username') || faker.internet.userName();
  cookies.set('username', userName, { expires: 10 });

  const store = configureStore({
    reducer: rootRedusers,
    preloadedState: {
      channels,
      currentChannelId,
      messages,
    },
  });

  const socket = io();
  socket.on('connect', () => {
    socket.on('newMessage', (data) => store.dispatch(addMessage(data)));
    socket.on('renameChannel', (data) => store.dispatch(renameChannel(data)));
    socket.on('removeChannel', (data) => store.dispatch(removeChannel(data)));
    socket.on('newChannel', (data) => store.dispatch(addChannel(data)));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const sendMessageFetch = createAsyncThunk(
  'messages/sendMessages',
  async ({ currentChannelId, message }) => {
    const url = routes.getChannelMessagesPath(currentChannelId);
    await axios.post(url, { data: { attributes: { message } } });
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    sendMessage(state, { payload }) {
      const { attributes } = payload.data;
      state.push(attributes);
    },
  },
  extraReducers: {
    [sendMessageFetch.rejected]: (state, { error }) => {
      throw error;
    },
  },
});

const { sendMessage } = messagesSlice.actions;

export { sendMessageFetch, sendMessage };
export default messagesSlice.reducer;

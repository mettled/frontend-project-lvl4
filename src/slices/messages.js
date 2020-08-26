import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const postMessage = createAsyncThunk(
  'messages/postMessage',
  async ({ currentChannelId, message }) => {
    const url = routes.getChannelMessagesPath(currentChannelId);
    try {
      const { data } = await axios.post(url, { data: { attributes: { message } } });
      return { data };
    } catch (e) {
      return { error: e.message };
    }
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    getNewMessage(state, { payload }) {
      const { attributes } = payload.data;
      state.push(attributes);
    },
  },
});

export const actions = { ...messagesSlice.actions, postMessage };
export default messagesSlice.reducer;

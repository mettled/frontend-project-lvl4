import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const addMessagesAsync = createAsyncThunk(
  'messages/newMessages',
  async ({ currentChannelId, message }) => {
    const url = routes.getChannelMessagesPath(currentChannelId);
    await axios.post(url, { data: { attributes: { message } } });
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const { attributes } = payload.data;
      return [...state, attributes];
    },
  },
  extraReducers: {
    [addMessagesAsync.rejected]: (state, { error }) => {
      console.log(error);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export { addMessagesAsync };
export default messagesSlice.reducer;

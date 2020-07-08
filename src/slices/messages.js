import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';
import axios from 'axios';

const addMessagesAsync = createAsyncThunk(
  'messages/newMessages',
  async ({ currentChannelId, message }) => {
    const url = routes.channelMessagesPath(currentChannelId);
    const response = await axios.post(url, { data: { attributes: { message } } });
    return response.data;   
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const { attributes } = payload.data;
      return [ ...state, attributes ];
    }
   },
  extraReducers: {
    [addMessagesAsync.rejected]: (state, { error }) => {
      console.log(error);
    }
  },
})

export const { addMessage } = messagesSlice.actions;

export { addMessagesAsync };
export default messagesSlice.reducer;
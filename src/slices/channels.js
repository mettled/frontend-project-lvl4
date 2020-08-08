import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { remove } from 'lodash';
import routes from '../routes';

const addChannelFetch = createAsyncThunk(
  'channels/addChannel',
  async ({ channelName }) => {
    const url = routes.getChannelsPath();
    const { data } = await axios.post(url, { data: { attributes: { name: channelName } } });
    return data;
  },
);

const removeChannelFetch = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }) => {
    const url = routes.getChannelPath(id);
    await axios.delete(url, { params: { id } });
  },
);

const renameChannelFetch = createAsyncThunk(
  'channels/renameChannel',
  async ({ name, id }) => {
    const url = routes.getChannelPath(id);
    await axios.patch(url, { data: { attributes: { name, id } } });
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload: { data } }) {
      state.push(data.attributes);
    },
    removeChannel(state, { payload }) {
      const { id: idRemoveChannel } = payload.data;
      remove(state, ({ id }) => id === idRemoveChannel);
    },
    renameChannel(state, { payload }) {
      const { name, id: currentChannelId } = payload.data.attributes;
      const channel = state.find(({ id }) => currentChannelId === id);
      channel.name = name;
    },
  },
  extraReducers: {
    [addChannelFetch.rejected]: (state, { error }) => {
      throw error;
    },
    [removeChannelFetch.rejected]: (state, { error }) => {
      throw error;
    },
    [renameChannelFetch.rejected]: (state, { error }) => {
      throw error;
    },
  },
});

const { removeChannel, addChannel, renameChannel } = channelsSlice.actions;

export {
  addChannelFetch,
  removeChannelFetch,
  renameChannelFetch,
  removeChannel,
  addChannel,
  renameChannel,
};
export default channelsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { remove } from 'lodash';
import routes from '../routes';

const postChannel = createAsyncThunk(
  'channels/postChannel',
  async ({ channelName }) => {
    const url = routes.getChannelsPath();
    try {
      const { data } = await axios.post(url, { data: { attributes: { name: channelName } } });
      return { data };
    } catch (e) {
      return { error: e.message };
    }
  },
);

const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async ({ id }) => {
    const url = routes.getChannelPath(id);
    try {
      const { data } = await axios.delete(url, { params: { id } });
      return { data };
    } catch (e) {
      return { error: e.message };
    }
  },
);

const updateChannelName = createAsyncThunk(
  'channels/updateChannelName',
  async ({ name, id }) => {
    const url = routes.getChannelPath(id);
    try {
      const { data } = await axios.patch(url, { data: { attributes: { name, id } } });
      return { data };
    } catch (e) {
      return { error: e.message };
    }
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
      const { id: removedChannelId } = payload.data;
      remove(state, ({ id }) => id === removedChannelId);
    },
    renameChannel(state, { payload }) {
      const { name, id: currentChannelId } = payload.data.attributes;
      const channel = state.find(({ id }) => currentChannelId === id);
      channel.name = name;
    },
  },
});

export const actions = {
  ...channelsSlice.actions,
  postChannel,
  deleteChannel,
  updateChannelName,
};
export default channelsSlice.reducer;

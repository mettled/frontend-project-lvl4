import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { remove } from 'lodash';
import routes from '../routes';

const postChannel = createAsyncThunk(
  'channels/postChannel',
  async ({ channelName }) => {
    const url = routes.getChannelsPath();
    const { data } = await axios.post(url, { data: { attributes: { name: channelName } } });
    return data;
  },
);

const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async ({ id }) => {
    const url = routes.getChannelPath(id);
    await axios.delete(url, { params: { id } });
  },
);

const patchChannel = createAsyncThunk(
  'channels/patchChannel',
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
  patchChannel,
};
export default channelsSlice.reducer;

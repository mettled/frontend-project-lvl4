import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const DEFAULT_CHANNEL = 1;

const addChannelAsync = createAsyncThunk(
  'channels/addChannel',
  async ({ channelName }) => {
    const url = routes.getChannelsPath();
    const { data } = await axios.post(url, { data: { attributes: { name: channelName } } });
    return data;
  },
);

const removeChannelAsync = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }) => {
    const url = routes.getChannelPath(id);
    await axios.delete(url, { params: { id } });
  },
);

const renameChannelAsync = createAsyncThunk(
  'channels/renameChannel',
  async ({ name, id }) => {
    const url = routes.getChannelPath(id);
    await axios.patch(url, { data: { attributes: { name, id } } });
  },
);

const chanelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel: (state, { payload: { data } }) => [...state, data.attributes],
    removeChannel: (state, { payload }) => {
      const { id: idRemoveChannel } = payload.data;
      return state.filter(({ id }) => id !== idRemoveChannel);
    },
    renameChannel: (state, { payload }) => {
      const { name, id: currentChannelId } = payload.data.attributes;
      const channel = state.find(({ id }) => currentChannelId === id);
      channel.name = name;
    },
  },
  extraReducers: {
    [addChannelAsync.rejected]: (state, { error }) => {
      console.log(error);
    },
    [removeChannelAsync.rejected]: (state, { error }) => {
      console.log(error);
    },
    [renameChannelAsync.rejected]: (state, { error }) => {
      console.log(error);
    },
  },
});

const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    changeCurrentChannel: (state, { payload }) => payload.id,
  },
  extraReducers: {
    [addChannelAsync.fulfilled]: (state, { payload: { data: { id } } }) => id,
    [chanelsSlice.actions.removeChannel]: () => DEFAULT_CHANNEL,
  },
});


export const { removeChannel, addChannel, renameChannel } = chanelsSlice.actions;
export { addChannelAsync, removeChannelAsync, renameChannelAsync };
export const { changeCurrentChannel } = currentChannelSlice.actions;

export default ({
  channels: chanelsSlice.reducer,
  currentChannelId: currentChannelSlice.reducer,
});

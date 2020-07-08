import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';
import axios from 'axios';

const DEFAULT_CHANNEL = 1;

const addChannelAsync = createAsyncThunk(
  'channels/addChannel',
  async ({ channelName }) => {
    const url = routes.channelsPath();
    await axios.post(url, { data: { attributes: { name: channelName } } }); 
  }
);

const removeChannelAsync = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }) => {
    const url = routes.channelPath(id);
    await axios.delete(url, { params: { id } });
  }
);

const renameChannelAsync = createAsyncThunk(
  'channels/renameChannel',
  async ({ name, id }) => {
    const url = routes.channelPath(id);
    const response = await axios.patch(url, { data: { attributes: { name, id } } });
  }
);

const chanelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel: (state, { payload: { data } }) => [ ...state, data.attributes ],
    removeChannel: (state, { payload }) => {
      const { id: idRemoveChannel } = payload.data;
      return state.filter(({ id }) => id !== idRemoveChannel)
    },
    renameChannel: (state, { payload }) => {
      const { name, id: currentChannelId } = payload.data.attributes;
      state.find(({ id }, index) => {
        if (currentChannelId === id) {
          state[index].name = name;
          return true;
        }
        return false;
      });
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
    }
  },
});


const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    changeCurrentChannel: (state, { payload }) =>  payload.id,
  },
  extraReducers: {
    [chanelsSlice.actions.removeChannel]: () => DEFAULT_CHANNEL,
  }
});


export const { removeChannel, addChannel, renameChannel } = chanelsSlice.actions;
export { addChannelAsync, removeChannelAsync, renameChannelAsync };
export const { changeCurrentChannel } = currentChannelSlice.actions;

export default ({
  channels: chanelsSlice.reducer,
  currentChannelId: currentChannelSlice.reducer,
});

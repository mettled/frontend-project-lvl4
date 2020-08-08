import { createSlice } from '@reduxjs/toolkit';
import { removeChannel, addChannel } from './channels';

const DEFAULT_ID = 1;

const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: DEFAULT_ID,
  reducers: {
    changeCurrentChannel: (state, { payload }) => payload.id,
  },
  extraReducers: {
    [addChannel]: (state, { payload: { data: { id } } }) => id,
    [removeChannel]: () => DEFAULT_ID,
  },
});

export const { changeCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;

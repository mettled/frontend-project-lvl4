import { createSlice } from '@reduxjs/toolkit';
import { removeChannel, addChannelFetch } from './channels';

const DEFAULT_ID = 1;

const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: DEFAULT_ID,
  reducers: {
    changeCurrentChannel: (state, { payload }) => payload.id,
  },
  extraReducers: {
    [addChannelFetch.fulfilled]: (state, { payload: { data: { id } } }) => id,
    [removeChannel]: () => DEFAULT_ID,
  },
});

export const { changeCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;

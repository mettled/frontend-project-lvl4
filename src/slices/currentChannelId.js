import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channels';

const DEFAULT_ID = 1;

const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: DEFAULT_ID,
  reducers: {
    changeCurrentChannel: (state, { payload }) => payload.id,
  },
  extraReducers: {
    [channelsActions.addChannel]: (state, { payload: { data: { id } } }) => id,
    [channelsActions.removeChannel]: () => DEFAULT_ID,
  },
});

export const { actions } = currentChannelSlice;
export default currentChannelSlice.reducer;

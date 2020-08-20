import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modal',
  initialState: null,
  reducers: {
    showModal: (state, { payload }) => payload,
    hideModal: () => null,
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;

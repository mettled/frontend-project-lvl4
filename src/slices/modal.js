import { createSlice } from '@reduxjs/toolkit';

const modalssSlice = createSlice({
  name: 'modal',
  initialState: null,
  reducers: {
    showModal: (state, { payload }) => {
      return payload;
    },
    hideModal: () => {
      return null;
    },
  },
});

export const { showModal, hideModal } = modalssSlice.actions;

export default modalssSlice.reducer;
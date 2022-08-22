import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEventModalOpen: false,
  },
  reducers: {
    onOpenEventModal: (state) => {
      state.isEventModalOpen = true;
    },
    onCloseEventModal: (state) => {
      state.isEventModalOpen = false;
    },
  },
});

export const { onOpenEventModal, onCloseEventModal } = uiSlice.actions;

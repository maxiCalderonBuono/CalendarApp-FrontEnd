import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEventModalOpen: false,
    isLanguageChanging: false,
  },
  reducers: {
    onOpenEventModal: (state) => {
      state.isEventModalOpen = true;
    },
    onCloseEventModal: (state) => {
      state.isEventModalOpen = false;
    },

    onChangeLanguage: (state) => {
      state.isLanguageChanging = !state.isLanguageChanging;
    },
  },
});

export const { onOpenEventModal, onCloseEventModal, onChangeLanguage } =
  uiSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice, authSlice } from "./";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('notes', JSON.stringify(store.getState().notes));
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
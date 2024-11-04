import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../types/note.interface";

const savedNotes = localStorage.getItem('notes');
const initialState: Note[] = savedNotes ? JSON.parse(savedNotes) : [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      console.log("🚀 ~ action:", action)
      console.log("🚀 ~ state:", state)
      state.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      if (index !== -1)
        state[index] = action.payload;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter(note => note.id !== action.payload);
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
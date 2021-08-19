import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState: {
    value: [
      {
        id: uuidv4(),
        city: 'Belo Horizonte',
        date: new Date(),
        description: 'Reminder Example'
      }
    ]
  },
  reducers: {
    addReminder: (state, action) => {
      state.value = [
        ...state.value,
        {
          id: uuidv4(),
          ...action.payload
        }
      ];
    },
    deleteReminder: (state, action) => {
      state.value = state.value.filter((r) => r.id !== action.payload);
    },
    editReminder: (state, action) => {
      const currentReminder = state.value.find(
        (r) => r.id === action.payload.id
      );
      const index = state.value.indexOf(currentReminder);

      state.value = [
        ...state.value.slice(0, index),
        action.payload,
        ...state.value.slice(index + 1, state.value.length + 1)
      ];
    }
  }
});

export const { addReminder, deleteReminder, editReminder } =
  remindersSlice.actions;

export const selectReminders = (state) => state.reminders.value;

export default remindersSlice.reducer;

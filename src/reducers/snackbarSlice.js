import { createSlice } from '@reduxjs/toolkit'

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    open: false,
    message: ''
  },
  reducers: {
    show: (state) => {
      state.open = true
    },
    hide: (state) => {
      state.open = false
    },
    changeMessage: (state, payload) => {
      state.message = payload.payload
    }
  }
})

export const { show, hide, changeMessage } = snackbarSlice.actions

export const selectSnackBar = (state) => state.snackbar

export default snackbarSlice.reducer

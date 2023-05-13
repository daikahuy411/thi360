import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedClass: null
}

export const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    selectClass: (state, action) => {
      state.selectedClass = { ...action.payload }
    }
  }
})

export const { selectClass } = classSlice.actions
export const selectedClass = state => state.classes.selectedClass
export default classSlice.reducer

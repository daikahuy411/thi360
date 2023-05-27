import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedExamItem: null
}

export const examItemSlice = createSlice({
  name: 'examItems',
  initialState,
  reducers: {
    selectExamItem: (state, action) => {
      state.selectedExamItem = { ...action.payload }
    }
  }
})

export const { selectExamItem } = examItemSlice.actions
export const selectedExamItem = state => state.examItems.selectedExamItem
export default examItemSlice.reducer

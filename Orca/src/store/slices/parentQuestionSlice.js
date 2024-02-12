import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedParentQuestion: null
}

export const parentQuestionSlice = createSlice({
  name: 'parentquestions',
  initialState,
  reducers: {
    selectParentQuestion: (state, action) => {
      state.selectedParentQuestion = action.payload ? { ...action.payload } : null
    }
  }
})

export const { selectParentQuestion } = parentQuestionSlice.actions
export const selectedParentQuestion = state => state.parentquestions.selectedParentQuestion
export default parentQuestionSlice.reducer

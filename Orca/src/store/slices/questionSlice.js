import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedQuestion: null
}

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    selectQuestion: (state, action) => {
      state.selectedQuestion = { ...action.payload }
    }
  }
})

export const { selectQuestion } = questionSlice.actions
export const selectedQuestion = state => state.questions.selectedQuestion
export default questionSlice.reducer

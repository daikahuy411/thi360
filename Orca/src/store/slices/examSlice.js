import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedExam: null
}

export const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    selectExam: (state, action) => {
      state.selectedExam = { ...action.payload }
    }
  }
})

export const { selectExam } = examSlice.actions
export const selectedExam = state => state.exams.selectedExam
export default examSlice.reducer

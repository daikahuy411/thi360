import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedExamCategory: null
}

export const examCategorySlice = createSlice({
  name: 'examCategories',
  initialState,
  reducers: {
    selectExamCategory: (state, action) => {
      state.selectedExamCategory = { ...action.payload }
    }
  }
})

export const { selectExamCategory } = examCategorySlice.actions
export const selectedExamCategory = state => state.examCategories.selectedExamCategory
export default examCategorySlice.reducer

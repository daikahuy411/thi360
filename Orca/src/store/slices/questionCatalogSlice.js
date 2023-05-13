import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedQuestionCatalog: null
}

export const questionCatalogSlice = createSlice({
  name: 'questioncatalogs',
  initialState,
  reducers: {
    selectQuestionCatalog: (state, action) => {
      state.selectedQuestionCatalog = { ...action.payload }
    }
  }
})

export const { selectQuestionCatalog } = questionCatalogSlice.actions
export const selectedQuestionCatalog = state => state.questioncatalogs.selectedQuestionCatalog
export default questionCatalogSlice.reducer

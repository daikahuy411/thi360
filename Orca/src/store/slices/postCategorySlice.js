import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPostCategory: null
}

export const postCategorySlice = createSlice({
  name: 'postCategories',
  initialState,
  reducers: {
    selectPostCategory: (state, action) => {
      state.selectedPostCategory = { ...action.payload }
    }
  }
})

export const { selectPostCategory } = postCategorySlice.actions
export const selectedPostCategory = state => state.postCategories.selectedPostCategory
export default postCategorySlice.reducer

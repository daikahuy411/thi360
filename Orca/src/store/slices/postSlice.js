import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPost: null
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = { ...action.payload }
    }
  }
})

export const { selectPost } = postSlice.actions
export const selectedPost = state => state.posts.selectedPost
export default postSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedUser: null
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectedUser: (state, action) => {
      state.selectedUser = { ...action.payload }
    }
  }
})

export const { selectUser } = userSlice.actions
export const selectedUser = state => state.users.selectedUser
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProfile: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    selectProfile: (state, action) => {
      state.selectedProfile = { ...action.payload }
    }
  }
})

export const { selectProfile } = profileSlice.actions
export const selectedProfile = state => state.profile.selectedProfile
export default profileSlice.reducer

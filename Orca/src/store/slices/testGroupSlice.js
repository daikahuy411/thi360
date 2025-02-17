import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTestGroup: null
}

export const testGroupSlice = createSlice({
  name: 'testgroups',
  initialState,
  reducers: {
    selectTestGroup: (state, action) => {
      state.selectedTestGroup = action.payload ? { ...action.payload } : null
    }
  }
})

export const { selectTestGroup } = testGroupSlice.actions
export const selectedTestGroup = state => state.testgroups.selectedTestGroup
export default testGroupSlice.reducer

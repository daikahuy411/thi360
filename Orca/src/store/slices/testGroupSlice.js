import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTestGroup: null
}

export const testGroupSlice = createSlice({
  name: 'testgroups',
  initialState,
  reducers: {
    selectTestGroup: (state, action) => {
      state.selecteTestGroup = { ...action.payload }
    }
  }
})

export const { selectTestGroup } = testGroupSlice.actions
export const selectedTestGroup = state => state.testgroups.selectedTestGroup
export default testGroupSlice.reducer

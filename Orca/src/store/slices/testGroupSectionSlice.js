import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTestGroupSection: null
}

export const testGroupSectionSlice = createSlice({
  name: 'testgroupsections',
  initialState,
  reducers: {
    selectTestGroupSection: (state, action) => {
      state.selectedTestGroupSection = { ...action.payload }
    }
  }
})

export const { selectTestGroupSection } = testGroupSectionSlice.actions
export const selectedTestGroupSection = state => state.testgroupsections.selectedTestGroupSection
export default testGroupSectionSlice.reducer

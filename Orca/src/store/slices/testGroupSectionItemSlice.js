import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTestGroupSection: null
}

export const testGroupSectionItemSlice = createSlice({
  name: 'testgroupsectionitems',
  initialState,
  reducers: {
    selectTestGroupSectionItem: (state, action) => {
      state.selectedTestGroupSectionItem = action.payload ? { ...action.payload } : null
    }
  }
})

export const { selectTestGroupSectionItem } = testGroupSectionItemSlice.actions
export const selectedTestGroupSectionItem = state => state.testgroupsectionitems.selectedTestGroupSectionItem
export default testGroupSectionItemSlice.reducer

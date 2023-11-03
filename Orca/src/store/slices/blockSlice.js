import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedBlock: null
}

export const blockSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    selectBlock: (state, action) => {
      state.selectedBlock = { ...action.payload }
    }
  }
})

export const { selectBlock } = blockSlice.actions
export const selectedBlock = state => state.blocks.selectedBlock
export default blockSlice.reducer

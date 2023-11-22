import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAccount: null
}

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    selectAccount: (state, action) => {
      state.selectedAccount = { ...action.payload }
    }
  }
})

export const { selectAccount } = accountSlice.actions
export const selectedAccount = state => state.accounts.selectedAccount
export default accountSlice.reducer

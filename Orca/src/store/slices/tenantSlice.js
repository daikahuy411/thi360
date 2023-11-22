import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTenant: null
}

export const tenantSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    selectTenant: (state, action) => {
      state.selectedTenant = { ...action.payload }
    }
  }
})

export const { selectTenant } = tenantSlice.actions
export const selectedTenant = state => state.tenants.selectedTenant
export default tenantSlice.reducer

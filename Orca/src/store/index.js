import { configureStore } from '@reduxjs/toolkit'

import { classSlice } from './slices/classSlice'
import { examSlice } from './slices/examSlice'
import { questionCatalogSlice } from './slices/questionCatalogSlice'
import { testGroupSlice } from './slices/testGroupSlice'
import { userSlice } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    [classSlice.name]: classSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [examSlice.name]: examSlice.reducer,
    [testGroupSlice.name]: testGroupSlice.reducer,
    [questionCatalogSlice.name]: questionCatalogSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

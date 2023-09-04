import { configureStore } from '@reduxjs/toolkit'

import { classSlice } from './slices/classSlice'
import { examCategorySlice } from './slices/examCategorySlice'
import { examItemSlice } from './slices/examItemSlice'
import { examSlice } from './slices/examSlice'
import { questionCatalogSlice } from './slices/questionCatalogSlice'
import { questionSlice } from './slices/questionSlice'
import { testGroupSectionSlice } from './slices/testGroupSectionSlice'
import { testGroupSectionItemSlice } from './slices/testGroupSectionItemSlice'
import { testGroupSlice } from './slices/testGroupSlice'
import { userSlice } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    [classSlice.name]: classSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [examSlice.name]: examSlice.reducer,
    [testGroupSlice.name]: testGroupSlice.reducer,
    [questionCatalogSlice.name]: questionCatalogSlice.reducer,
    [questionSlice.name]: questionSlice.reducer,
    [examCategorySlice.name]: examCategorySlice.reducer,
    [testGroupSectionSlice.name]: testGroupSectionSlice.reducer,
    [examItemSlice.name]: examItemSlice.reducer,
    [testGroupSectionItemSlice.name]: testGroupSectionItemSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

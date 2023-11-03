import { configureStore } from '@reduxjs/toolkit'

import { classSlice } from './slices/classSlice'
import { examCategorySlice } from './slices/examCategorySlice'
import { examItemSlice } from './slices/examItemSlice'
import { examSlice } from './slices/examSlice'
import { profileSlice } from './slices/profileSlice'
import { questionCatalogSlice } from './slices/questionCatalogSlice'
import { questionSlice } from './slices/questionSlice'
import { testGroupSectionItemSlice } from './slices/testGroupSectionItemSlice'
import { testGroupSectionSlice } from './slices/testGroupSectionSlice'
import { testGroupSlice } from './slices/testGroupSlice'
import { userSlice } from './slices/userSlice'
import { postSlice } from './slices/postSlice'
import { blockSlice } from './slices/blockSlice'
import { postCategorySlice } from './slices/postCategorySlice'

export const store = configureStore({
  reducer: {
    [profileSlice.name]: profileSlice.reducer,
    [classSlice.name]: classSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [examSlice.name]: examSlice.reducer,
    [testGroupSlice.name]: testGroupSlice.reducer,
    [questionCatalogSlice.name]: questionCatalogSlice.reducer,
    [questionSlice.name]: questionSlice.reducer,
    [examCategorySlice.name]: examCategorySlice.reducer,
    [testGroupSectionSlice.name]: testGroupSectionSlice.reducer,
    [examItemSlice.name]: examItemSlice.reducer,
    [testGroupSectionItemSlice.name]: testGroupSectionItemSlice.reducer,
    [postSlice.name]: postSlice.reducer,
    [postCategorySlice.name]: postCategorySlice.reducer,
    [blockSlice.name]: blockSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

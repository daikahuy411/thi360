import { configureStore } from '@reduxjs/toolkit'

import { accountSlice } from './slices/accountSlice'
import { blockSlice } from './slices/blockSlice'
import { classSlice } from './slices/classSlice'
import { examCategorySlice } from './slices/examCategorySlice'
import { examItemSlice } from './slices/examItemSlice'
import { examSlice } from './slices/examSlice'
import { parentQuestionSlice } from './slices/parentQuestionSlice'
import { postCategorySlice } from './slices/postCategorySlice'
import { postSlice } from './slices/postSlice'
import { profileSlice } from './slices/profileSlice'
import { questionCatalogSlice } from './slices/questionCatalogSlice'
import { questionSlice } from './slices/questionSlice'
import { tenantSlice } from './slices/tenantSlice'
import { testGroupSectionItemSlice } from './slices/testGroupSectionItemSlice'
import { testGroupSectionSlice } from './slices/testGroupSectionSlice'
import { testGroupSlice } from './slices/testGroupSlice'
import { userSlice } from './slices/userSlice'

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
    [tenantSlice.name]: tenantSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [parentQuestionSlice.name]: parentQuestionSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

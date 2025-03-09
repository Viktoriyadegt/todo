import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { appReducer, appSlice } from "./appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

export const store = configureStore({
  reducer: {
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

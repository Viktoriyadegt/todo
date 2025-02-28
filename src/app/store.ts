import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { authReducer, authSlice } from "../features/auth/model/authSlice"
import { appReducer, appSlice } from "./appSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

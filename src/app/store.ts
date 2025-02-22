import { applyMiddleware, combineReducers, legacy_createStore as createStore, type UnknownAction } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/auth-reducer"
import { appReducer } from "./app-reducer"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store

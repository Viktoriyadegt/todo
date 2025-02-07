import {applyMiddleware, combineReducers, legacy_createStore as createStore, type UnknownAction} from "redux"
import {todolistsReducer} from "../features/todolists/model/todolists-reducer"
import {tasksReducer} from "../features/todolists/model/tasks-reducer"
import {appReducer} from "../features/todolists/model/app-reducer"
import {thunk, type ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

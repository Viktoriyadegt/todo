import {combineReducers, legacy_createStore as createStore} from 'redux'
import {todolistsReducer} from "../features/todolists/model/todolists-reducer";
import {tasksReducer} from "../features/todolists/model/tasks-reducer";
import {appReducer} from "../features/todolists/model/app-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})


export const store = createStore(rootReducer)

export type AppRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
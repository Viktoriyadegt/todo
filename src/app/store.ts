import {combineReducers, legacy_createStore as createStore} from 'redux'
import {todolistsReducer} from "../model/todolists-reducer";
import {tasksReducer} from "../model/tasks-reducer";
import {appReducer} from "../model/app-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})


export const store = createStore(rootReducer)

export type AppRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
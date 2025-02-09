import type {Todolist} from "../api/todolistsApi.types";
import {todolistsApi} from "../api/todolistsApi";
import type {AppDispatch} from "../../../app/store";

export type DomainTodolist = Todolist & {
    filter: FilterType
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{...action.payload.todolist, filter: 'All'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl))
        }
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({...tl, filter: 'All'}))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (payload: { todolistId: string }) => {
    return {type: "REMOVE-TODOLIST", payload} as const
}

export const addTodolistAC = (payload: { todolist: Todolist }) => {
    return {type: "ADD-TODOLIST", payload} as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload} as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {id, filter}} as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
    return {type: "SET-TODOLISTS", todolists} as const
}

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
    todolistsApi.getTodolists().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
    todolistsApi.createTodolist(title).then((res) => {
        dispatch(addTodolistAC({todolist: res.data.data.item}))
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
    todolistsApi.deleteTodolist(todolistId).then(() => {
        dispatch(removeTodolistAC({todolistId}))
    })
}

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: AppDispatch) => {
    todolistsApi.updateTodolist({id, title}).then(() => {
        dispatch(changeTodolistTitleAC({id, title}))
    })
}


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsACActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsACActionType

export type FilterType = "All" | "Active" | "Completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

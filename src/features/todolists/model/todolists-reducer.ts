import {v1} from "uuid"
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
            return state.filter((tl) => tl.id !== action.payload.id) // логика по удалению тудулиста
        }
        case "ADD-TODOLIST": {
            const NewTodolist: DomainTodolist = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "All",
                addedDate: '',
                order: 0
            }
            return [NewTodolist, ...state]
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

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", payload: {title, todolistId: v1()}} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {id, title}} as const
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

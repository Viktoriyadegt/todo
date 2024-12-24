import {FilterTYpe, TodolistType} from '../App'
import {v1} from 'uuid'

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterTYpe
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id) // логика по удалению тудулиста
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'All'}]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
    }
        case 'CHANGE-TODOLIST-FILTER':{
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', payload: { title, todolistId : v1() } } as const
}

export const changeTodolistTitleAC = (id:string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id,  title } } as const
}

export const changeTodolistFilterAC = (id:string, filter: FilterTYpe): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id,  filter } } as const
}
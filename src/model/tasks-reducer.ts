import {v1} from "uuid";
import {TasksStateType} from "../app/App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionsType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType



let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const {title, todolistId} = action.payload
            return {
                ...state,
                [todolistId]: [{
                    id: v1(),
                    title,
                    isDone: false
                }, ...state[todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            const {taskId, todolistId, isDone} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {
                    ...t,
                    isDone
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            const {taskId, todolistId, title} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {
                    ...t,
                    title
                } : t)
            }
        }
        case "ADD-TODOLIST":{
            const {todolistId} = action.payload
            return {...state, [todolistId]: []}
        }
        case "REMOVE-TODOLIST":{
            const { id} = action.payload
            delete state[id]
            return {...state}
        }

        default:
            return state
    }
}

export const removeTaskAC = (payload: { todolistId: string,  taskId: string }) => {
    return {type: 'REMOVE-TASK', payload} as const
}

export const addTaskAC = (payload: { todolistId: string, title: string }) => {
    return {type: 'ADD-TASK', payload} as const
}

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {type: 'CHANGE-TASK-STATUS', payload} as const
}

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {type: 'CHANGE-TASK-TITLE', payload} as const
}


export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
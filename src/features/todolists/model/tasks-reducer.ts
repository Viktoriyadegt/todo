import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer"
import type {AppDispatch, RootState} from "../../../app/store";
import {tasksApi} from "../api/tasksApi";
import type {DomainTask, UpdateTaskDomainModel, UpdateTaskModel} from "../api/tasksApi.types";
import {TaskStatus} from "common/enums";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
            }
        }
        case "ADD-TASK": {
            const {task} = action.payload
            return {
                ...state,
                [task.todoListId]: [task, ...state[task.todoListId]],
            }
        }

        case "ADD-TODOLIST": {
            const {todolistId} = action.payload
            return {...state, [todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const {id} = action.payload
            delete state[id]
            return {...state}
        }
        case "SET-TASK":
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy

        case "UPDATE-TASK": {
            const {task} = action.payload
            return {
                ...state,
                [task.todoListId]: state[task.todoListId].map((t) => t.id === task.id ? {...task} : t),
            }
        }

        default:
            return state
    }
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
    return {type: "REMOVE-TASK", payload} as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
    return {type: "ADD-TASK", payload} as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {type: "SET-TASK", payload} as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
    return {type: "UPDATE-TASK", payload} as const
}


export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
    tasksApi.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC({todolistId, tasks: res.data.items}))
    })
}

export const removeTaskTC = (args: { taskId: string, todolistId: string }) => (dispatch: AppDispatch) => {
    tasksApi.deleteTask(args).then(() => {
        dispatch(removeTaskAC(args))
    })
}

export const addTaskTC = (args: { todolistId: string, title: string }) => (dispatch: AppDispatch) => {
    tasksApi.createTask(args).then((res) => {
        dispatch(addTaskAC({task: res.data.data.item}))
    })
}


export const updateTaskTC = (model: DomainTask) => (dispatch: AppDispatch) => {

        const domainModel: UpdateTaskModel = {
            title: model.title,
            description: model.description,
            priority: model.priority,
            status: model.status,
            startDate: model.startDate,
            deadline: model.deadline
        }

        tasksApi.updateTask({todolistId: model.todoListId, taskId: model.id, model:domainModel}).then((res) => {
            dispatch(updateTaskAC({task: res.data.data.item}))


        })
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type setTasksACType = ReturnType<typeof setTasksAC>
export type updateTaskACType = ReturnType<typeof updateTaskAC>

type ActionsType =
    | RemoveTaskACType
    | AddTaskACType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTasksACType
    | updateTaskACType


export type TasksStateType = {
    [key: string]: DomainTask[]
}

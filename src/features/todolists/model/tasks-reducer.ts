import { v1 } from "uuid"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import type {AppDispatch} from "../../../app/store";
import {tasksApi} from "../api/tasksApi";
import type {DomainTask} from "../api/tasksApi.types";
import {TaskPriority, TaskStatus} from "common/enums";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case "ADD-TASK": {
      const { todolistId } = action.payload
        const newTask: DomainTask = {
          title: action.payload.title,
          todoListId: todolistId,
          startDate: '',
          priority: TaskPriority.Low,
          description: '',
          deadline: '',
          status: TaskStatus.New,
          addedDate: '',
          order: 0,
          id: v1(),
        }
      return {
        ...state,
        [todolistId]: [newTask, ...state[todolistId]],
      }
    }
    case "CHANGE-TASK-STATUS": {
      const { taskId, todolistId, status } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((t) =>
          t.id === taskId
            ? {
                ...t,
                status,
              }
            : t,
        ),
      }
    }
    case "CHANGE-TASK-TITLE": {
      const { taskId, todolistId, title } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((t) =>
          t.id === taskId
            ? {
                ...t,
                title,
              }
            : t,
        ),
      }
    }
    case "ADD-TODOLIST": {
      const { todolistId } = action.payload
      return { ...state, [todolistId]: [] }
    }
    case "REMOVE-TODOLIST": {
      const { id } = action.payload
      delete state[id]
      return { ...state }
    }
    case "SET-TASK":
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy

    default:
      return state
  }
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE-TASK", payload } as const
}

export const addTaskAC = (payload: { todolistId: string; title: string }) => {
  return { type: "ADD-TASK", payload } as const
}

export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; status: TaskStatus }) => {
  return { type: "CHANGE-TASK-STATUS", payload } as const
}

export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return { type: "CHANGE-TASK-TITLE", payload } as const
}

export const setTasksAC = ( payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASK", payload } as const
}


export const fetchTasksTC = (todolistId:string)=>(dispatch: AppDispatch)=>{
  tasksApi.getTasks(todolistId).then((res)=>{
    dispatch(setTasksAC({todolistId, tasks: res.data.items}))
  })
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type setTasksACType = ReturnType<typeof setTasksAC>

type ActionsType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTasksACType




export type TasksStateType = {
  [key: string]: DomainTask[]
}

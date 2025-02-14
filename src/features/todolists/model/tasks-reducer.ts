import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import type { AppDispatch, AppThunk } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { type RequestStatus, setAppErrorAC, setAppStatusAC } from "./app-reducer"
import { ResultCode, TaskStatus } from "common/enums/enums"
import { handleAppError } from "common/utils/handleAppError"
import { handleNetworkError } from "common/utils/handleNetworkError"

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
      const { task } = action.payload
      return {
        ...state,
        [task.todoListId]: [task, ...state[task.todoListId]],
      }
    }

    case "ADD-TODOLIST": {
      const { id } = action.payload.todolist
      return { ...state, [id]: [] }
    }
    case "REMOVE-TODOLIST": {
      const { todolistId } = action.payload
      delete state[todolistId]
      return { ...state }
    }
    case "SET-TASK":
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy

    case "UPDATE-TASK": {
      const { task } = action.payload
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? { ...task } : t)),
      }
    }

    case "CHANGE-TASK-ENTITY-STATUS": {
      const { id, todolistId, status } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((t) => (t.id === id ? { ...t, status } : t)),
      }
    }

    default:
      return state
  }
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE-TASK", payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASK", payload } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return { type: "UPDATE-TASK", payload } as const
}

export const changeTaskEntityStatusAC = (payload: { todolistId: string; id: string; status: TaskStatus }) => {
  return { type: "CHANGE-TASK-ENTITY-STATUS", payload } as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setTasksAC({ todolistId, tasks: res.data.items }))
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(changeTaskEntityStatusAC({ todolistId: args.todolistId, id: args.taskId, status: TaskStatus.InProgress }))
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .deleteTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTaskAC(args))
      } else {
        dispatch(
          changeTaskEntityStatusAC({ todolistId: args.todolistId, id: args.taskId, status: TaskStatus.Completed }),
        )
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const addTaskTC =
  (args: { todolistId: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .createTask(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(addTaskAC({ task: res.data.data.item }))
        } else {
          handleAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleNetworkError(dispatch, error)
      })
  }

export const updateTaskTC = (model: DomainTask) => (dispatch: AppDispatch) => {
  const domainModel: UpdateTaskModel = {
    title: model.title,
    description: model.description,
    priority: model.priority,
    status: model.status,
    startDate: model.startDate,
    deadline: model.deadline,
  }
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .updateTask({ todolistId: model.todoListId, taskId: model.id, model: domainModel })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(updateTaskAC({ task: res.data.data.item }))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type ChangeTaskEntityStatusACType = ReturnType<typeof changeTaskEntityStatusAC>

type ActionsType =
  | RemoveTaskACType
  | AddTaskACType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksACType
  | UpdateTaskACType
  | ChangeTaskEntityStatusACType

export type TasksStateType = {
  [key: string]: DomainTask[]
}

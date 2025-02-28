import type { AppDispatch } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode, TaskStatus } from "common/enums/enums"
import { handleAppError } from "common/utils/handleAppError"
import { handleNetworkError } from "common/utils/handleNetworkError"
import { setAppStatus } from "app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
      index !== -1 && state[action.payload.todolistId].splice(index, 1)
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
      let index = state[action.payload.task.todoListId].findIndex((t) => t.id === action.payload.task.id)
      state[action.payload.task.todoListId][index] = action.payload.task
    }),
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    changeTaskEntityStatus: create.reducer<{ todolistId: string; id: string; status: TaskStatus }>((state, action) => {
      let task = state[action.payload.todolistId].find((t) => t.id === action.payload.id)
      task && (task.status = action.payload.status)
    }),
    clearTasks: create.reducer(() => {
      return {}
    }),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export const { removeTask, addTask, setTasks, clearTasks, updateTask, changeTaskEntityStatus } = tasksSlice.actions

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTasks({ todolistId, tasks: res.data.items }))
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(changeTaskEntityStatus({ todolistId: args.todolistId, id: args.taskId, status: TaskStatus.InProgress }))
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .deleteTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTask(args))
      } else {
        dispatch(changeTaskEntityStatus({ todolistId: args.todolistId, id: args.taskId, status: TaskStatus.Completed }))
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const addTaskTC = (args: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .createTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTask({ task: res.data.data.item }))
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
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .updateTask({ todolistId: model.todoListId, taskId: model.id, model: domainModel })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(updateTask({ task: res.data.data.item }))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export type TasksStateType = {
  [key: string]: DomainTask[]
}

import type { AppDispatch, RootState } from "../../../app/store"
import type { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode, TaskStatus } from "common/enums/enums"
import { handleAppError } from "common/utils/handleAppError"
import { handleNetworkError } from "common/utils/handleNetworkError"
import { setAppStatus } from "app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { _tasksApi } from "../api/tasksApi"

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
      const tasks = state[action.payload.task.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.task.id)
      tasks[index] = { ...tasks[index], ...action.payload.task }
    }),
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    changeTaskEntityStatus: create.reducer<{ todolistId: string; id: string; status: TaskStatus }>((state, action) => {
      let task = state[action.payload.todolistId].find((t) => t.id === action.payload.id)
      task && (task.status = action.payload.status)
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
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer

export const { removeTask, addTask, setTasks, updateTask, changeTaskEntityStatus } = tasksSlice.actions

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _tasksApi
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
  _tasksApi
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
  _tasksApi
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

export const updateTaskTC =
  (args: { domainModel: Partial<DomainTask>; todolistId: string; taskId: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[args.todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === args.taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...args.domainModel,
      }
      dispatch(setAppStatus({ status: "loading" }))
      _tasksApi
        .updateTask({ todolistId: args.todolistId, taskId: args.taskId, model })
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
  }

export type TasksStateType = {
  [key: string]: DomainTask[]
}

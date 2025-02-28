import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppDispatch } from "../../../app/store"
import { ResultCode } from "common/enums/enums"
import { handleAppError } from "common/utils/handleAppError"
import { handleNetworkError } from "common/utils/handleNetworkError"
import { type RequestStatus, setAppStatus } from "../../../app/appSlice"
import { createSlice } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      index !== -1 && state.splice(index, 1)
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const todolist = state.find((t) => t.id === action.payload.id)
      todolist && (todolist.title = action.payload.title)
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterType }>((state, action) => {
      const todolist = state.find((t) => t.id === action.payload.id)
      todolist && (todolist.filter = action.payload.filter)
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      action.payload.todolists.forEach((t) => state.push({ ...t, filter: "All", entityStatus: "idle" }))
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      index > 0 && (state[index].entityStatus = action.payload.entityStatus)
    }),
    resetTodolists: create.reducer((state, action) => {
      return []
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors

export const {
  setTodolists,
  addTodolist,
  removeTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  resetTodolists,
} = todolistsSlice.actions

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolists({ todolists: res.data }))
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTodolist({ todolist: res.data.data.item }))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: "loading" }))
  todolistsApi
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTodolist({ todolistId: todolistId }))
      } else {
        dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: "idle" }))
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .updateTodolist({ id, title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistTitle({ id, title }))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export type FilterType = "All" | "Active" | "Completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

export type DomainTodolist = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
}

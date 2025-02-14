import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppDispatch, AppThunk } from "../../../app/store"
import { type RequestStatus, setAppStatusAC } from "./app-reducer"
import { ResultCode } from "common/enums/enums"
import { handleAppError } from "common/utils/handleAppError"
import { handleNetworkError } from "common/utils/handleNetworkError"

export type DomainTodolist = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todolistId)
    }
    case "ADD-TODOLIST": {
      return [{ ...action.payload.todolist, filter: "All", entityStatus: "idle" }, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
      )
    }
    default:
      return state
  }
}

export const removeTodolistAC = (payload: { todolistId: string }) => {
  return { type: "REMOVE-TODOLIST", payload } as const
}

export const addTodolistAC = (payload: { todolist: Todolist }) => {
  return { type: "ADD-TODOLIST", payload } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterType) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setTodolistsAC(res.data))
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(addTodolistAC({ todolist: res.data.data.item }))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: "loading" }))
  todolistsApi
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTodolistAC({ todolistId }))
      } else {
        dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: "idle" }))
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .updateTodolist({ id, title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(changeTodolistTitleAC({ id, title }))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsACActionType = ReturnType<typeof setTodolistsAC>

export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsACActionType
  | ChangeTodolistEntityStatusActionType

export type FilterType = "All" | "Active" | "Completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

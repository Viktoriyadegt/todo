import type { AppDispatch } from "../../../app/store"
import { handleNetworkError } from "common/utils/handleNetworkError"
import type { LoginArgs } from "../api/authApi.types"
import { authApi } from "../api/AuthApi"
import { ResultCode } from "common/enums/enums"
import { handleAppError } from "common/utils/handleAppError"
import { setAppStatusAC } from "../../../app/app-reducer"
import { resetTodolistsAC } from "../../todolists/model/todolists-reducer"

const initialState = {
  isLoggedIn: false,
  initialized: false,
}

export const authReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN": {
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    }
    case "SET_INITIALIZED": {
      return { ...state, initialized: action.payload.initialized }
    }

    default:
      return state
  }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

export const setInitializedAC = (initialized: boolean) => {
  return { type: "SET_INITIALIZED", payload: { initialized } } as const
}

export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(false))
        dispatch(resetTodolistsAC())
        localStorage.removeItem("sn-token")
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
}

export const initializeAppTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
    .finally(() => {
      dispatch(setInitializedAC(true))
    })
}

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setInitializedAC>

export type InitialState = typeof initialState

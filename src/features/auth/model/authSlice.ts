import type { AppDispatch } from "../../../app/store"
import { handleNetworkError } from "common/utils/handleNetworkError"
import type { LoginArgs } from "../api/authApi.types"
import { authApi } from "../api/AuthApi"
import { ResultCode } from "common/enums/enums"
import { handleAppError } from "common/utils/handleAppError"
import { setAppStatus } from "../../../app/appSlice"
import { resetTodolists } from "../../todolists/model/todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"
import { clearTasks } from "../../todolists/model/tasksSlice"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    initialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setInitialized: create.reducer<{ initialized: boolean }>((state, action) => {
      state.initialized = action.payload.initialized
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.initialized,
  },
})

export const authReducer = authSlice.reducer
const { setIsLoggedIn, setInitialized } = authSlice.actions
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

// thunks

export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
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
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(resetTodolists())
        dispatch(clearTasks())
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
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleNetworkError(dispatch, error)
    })
    .finally(() => {
      dispatch(setInitialized({ initialized: true }))
    })
}

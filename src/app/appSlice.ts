import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as null | string,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeMode, setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors

export type ThemeMode = "dark" | "light"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

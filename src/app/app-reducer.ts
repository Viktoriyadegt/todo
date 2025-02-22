const initialState = {
  themeMode: "dark" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as null | string,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME_MODE": {
      return { ...state, themeMode: action.payload.themeMode }
    }
    case "SET_STATUS": {
      return { ...state, status: action.payload.status }
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload.error }
    }

    default:
      return state
  }
}

export const changeThemeModeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE_THEME_MODE", payload: { themeMode } } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
  return { type: "SET_STATUS", payload: { status } } as const
}

export const setAppErrorAC = (error: null | string) => {
  return { type: "SET_ERROR", payload: { error } } as const
}

export type ChangeThemeModeActionType = ReturnType<typeof changeThemeModeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = ChangeThemeModeActionType | SetAppStatusActionType | SetAppErrorActionType

export type ThemeMode = "dark" | "light"

export type InitialState = typeof initialState

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

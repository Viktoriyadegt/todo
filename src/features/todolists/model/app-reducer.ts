const initialState = {
  themeMode: "dark" as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME_MODE": {
      return { ...state, themeMode: action.payload.themeMode }
    }

    default:
      return state
  }
}

export const changeThemeModeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE_THEME_MODE", payload: { themeMode } } as const
}

export type ChangeThemeModeActionType = ReturnType<typeof changeThemeModeAC>

type ActionsType = ChangeThemeModeActionType

export type ThemeMode = "dark" | "light"

export type InitialState = typeof initialState

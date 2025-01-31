import { AppRootState } from "../../../app/store"

export const selectThemeMode = (state: AppRootState) => state.app.themeMode

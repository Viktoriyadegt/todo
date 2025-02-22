import { createTheme } from "@mui/material"
import type { ThemeMode } from "../../app/app-reducer"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#3F51B5",
      },
    },
  })
}

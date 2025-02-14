import React from "react"
import "../features/todolists/ui/Todolist/TodolistTitle/TodolistTitle.module.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "common/hooks/hooks"
import { getTheme } from "common/theme"
import { Main } from "./Main"
import { Header } from "common/components/Header/Header"
import { selectThemeMode } from "../features/todolists/model/app-selector"
import { ErrorSnackbar } from "common/components"

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App

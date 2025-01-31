import React from "react"
import "../features/todolists/ui/todolist/todolistTitle/TodolistTitle.module.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { usAppSelector } from "common/hooks/hooks"
import { getTheme } from "common/theme"
import { Main } from "./Main"
import { Header } from "common/components/header/Header"
import { selectThemeMode } from "../features/todolists/model/app-selector"

function App() {
  const themeMode = usAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}

export default App

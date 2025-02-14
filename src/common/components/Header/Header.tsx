import React from "react"
import { AppBar, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { selectError, selectStatus, selectThemeMode } from "../../../features/todolists/model/app-selector"
import { changeThemeModeAC } from "../../../features/todolists/model/app-reducer"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { MenuButton } from "common/components"

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeThemeModeAC(themeMode == "light" ? "dark" : "light"))
  }

  return (
    <AppBar position={"static"} sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <Menu />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}

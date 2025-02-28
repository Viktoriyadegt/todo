import Menu from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import React from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { MenuButton } from "common/components"
import { changeThemeMode, selectStatus, selectThemeMode } from "../../../app/appSlice"
import { logoutTC, selectIsLoggedIn } from "../../../features/auth/model/authSlice"
import { useNavigate } from "react-router"
import { Path } from "common/routing/Routing"

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeThemeMode({ themeMode: themeMode == "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  const faqHandler = () => {
    navigate(Path.FAQ)
  }

  return (
    <AppBar position={"static"} sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <Menu />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton onClick={faqHandler} background={theme.palette.primary.dark}>
            Faq
          </MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}

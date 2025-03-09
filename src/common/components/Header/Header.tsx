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
import { changeThemeMode, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { useNavigate } from "react-router"
import { Path } from "common/routing/Routing"
import { useLogoutMutation } from "../../../features/auth/api/AuthApi"
import { ResultCode } from "common/enums/enums"
import { clearTasksAndTodolists } from "common/actions/common.actions"

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeThemeMode({ themeMode: themeMode == "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(clearTasksAndTodolists())
      }
    })
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

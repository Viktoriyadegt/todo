import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { Routing } from "common/routing"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "./appSlice"
import { useMeQuery } from "../features/auth/api/AuthApi"
import { ResultCode } from "common/enums/enums"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  const { data } = useMeQuery()

  useEffect(() => {
    if (data) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing isLoggedIn={isLoggedIn} />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}

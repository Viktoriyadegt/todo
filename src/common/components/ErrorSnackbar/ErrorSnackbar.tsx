import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectError } from "../../../app/app-selector"
import { setAppErrorAC } from "../../../app/app-reducer"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}

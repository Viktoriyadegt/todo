import type { AppDispatch } from "../../app/store"
import { setAppError, setAppStatus } from "../../app/appSlice"

export const handleNetworkError = (dispatch: AppDispatch, error: { message: string }) => {
  dispatch(setAppError({ error: error.message }))
  dispatch(setAppStatus({ status: "failed" }))
}

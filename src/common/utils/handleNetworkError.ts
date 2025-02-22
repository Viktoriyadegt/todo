import type { AppDispatch } from "../../app/store"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"

export const handleNetworkError = (dispatch: AppDispatch, error: { message: string }) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC("failed"))
}

import { setAppErrorAC, setAppStatusAC } from "../../features/todolists/model/app-reducer"
import type { AppDispatch } from "../../app/store"

export const handleNetworkError = (dispatch: AppDispatch, error: { message: string }) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC("failed"))
}

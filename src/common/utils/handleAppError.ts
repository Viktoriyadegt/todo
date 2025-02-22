import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import type { AppDispatch } from "../../app/store"
import type { ResponseType } from "common/types"

export const handleAppError = <T>(dispatch: AppDispatch, data: ResponseType<T>) => {
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred."))
  dispatch(setAppStatusAC("failed"))
}

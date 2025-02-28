import { setAppError, setAppStatus } from "../../app/appSlice"
import type { AppDispatch } from "../../app/store"
import type { ResponseType } from "common/types"

export const handleAppError = <T>(dispatch: AppDispatch, data: ResponseType<T>) => {
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred." }))
  dispatch(setAppStatus({ status: "failed" }))
}

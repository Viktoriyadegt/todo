import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"

export const usAppSelector = useSelector.withTypes<RootState>()
export const usAppDispatch = useDispatch.withTypes<AppDispatch>()

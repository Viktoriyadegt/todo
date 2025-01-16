import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "./store";

export const usAppSelector = useSelector.withTypes<AppRootState>()
export const usAppDispatch = useDispatch.withTypes<AppDispatch>()

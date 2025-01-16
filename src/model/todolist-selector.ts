import {useSelector} from "react-redux";
import {AppRootState} from "../app/store";
import {TasksStateType, TodolistType} from "../app/App";
import {usAppSelector} from "../app/hooks";

export const selectTodolists = (state:AppRootState) => state.todolists

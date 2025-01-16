import {IconButton} from "@mui/material";
import React from "react";
import {EditableSpan} from "../../../../../common/components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {usAppDispatch} from "../../../../../app/hooks";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "../../../model/todolists-reducer";

export type Props = {
    todolist: TodolistType
}


export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = usAppDispatch()


    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }


    return (
        <h3>
            <EditableSpan title={title} changeTitle={changeTaskTitleHandler}/>
            <IconButton>
                <Delete onClick={removeTodolistHandler}/>
            </IconButton>
        </h3>
    )
        ;
};


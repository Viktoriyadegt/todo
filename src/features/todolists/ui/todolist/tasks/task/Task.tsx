import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent} from "react";
import {usAppDispatch} from "../../../../../../app/hooks";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../model/tasks-reducer";
import {TaskType} from "../../../../model/tasks-reducer";
import {getListItemSx} from "./Task.styles.ts";

export type Props = {
    task: TaskType
    todolistId: string
}


export const Task = ({task, todolistId}: Props) => {

    const dispatch = usAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({todolistId, taskId: task.id}))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todolistId,
            taskId: task.id,
            isDone: e.currentTarget.checked
        }))
    }
    const changeTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }



    return (
        <ListItem key={task.id}
                  sx={getListItemSx(task.isDone)}
        >
            <div>
                <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                <EditableSpan title={task.title} changeTitle={changeTitleHandler}/>
            </div>
            <IconButton>
                <Delete onClick={removeTaskHandler}/>
            </IconButton>
        </ListItem>

    )
        ;
};


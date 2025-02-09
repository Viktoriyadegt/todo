import {Checkbox, IconButton, ListItem} from "@mui/material"
import {Delete} from "@mui/icons-material"
import React, {ChangeEvent} from "react"
import {removeTaskTC, updateTaskTC} from "../../../../model/tasks-reducer"
import {usAppDispatch} from "common/hooks"
import {EditableSpan} from "common/components"
import {getListItemSx} from "./Task.styles";
import type {DomainTask} from "../../../../api/tasksApi.types";
import {TaskStatus} from "common/enums";


export type Props = {
    task: DomainTask
    todolistId: string
}

export const Task = ({task, todolistId}: Props) => {
    const dispatch = usAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskTC({todolistId, taskId: task.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const model: DomainTask = {
            ...task,
            status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        }

        dispatch(updateTaskTC(model))
    }

    const changeTaskTitleHandler = (title: string) => {

        const model: DomainTask = {
            ...task,
            title
        }

        dispatch(updateTaskTC( model))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
}

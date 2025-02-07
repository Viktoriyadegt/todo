import {Checkbox, IconButton, ListItem} from "@mui/material"
import {Delete} from "@mui/icons-material"
import React, {ChangeEvent} from "react"
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../model/tasks-reducer"
import {usAppDispatch} from "common/hooks"
import {EditableSpan} from "common/components"
import {getListItemSx} from "./Task.styles";
import type {DomainTask} from "../../../../api/tasksApi.types";
import {TaskStatus} from "common/enums";


export type Props = {
  task: DomainTask
  todolistId: string
}

export const Task = ({ task, todolistId }: Props) => {
  const dispatch = usAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ todolistId, taskId: task.id }))
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusAC({
        todolistId,
        taskId: task.id,
        status: e.currentTarget.checked? TaskStatus.Completed: TaskStatus.New
      }),
    )
  }
  const changeTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status===TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status===TaskStatus.Completed} onChange={onChangeHandler} />
        <EditableSpan title={task.title} changeTitle={changeTitleHandler} />
      </div>
      <IconButton>
        <Delete onClick={removeTaskHandler} />
      </IconButton>
    </ListItem>
  )
}

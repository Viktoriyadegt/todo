import { Checkbox, IconButton, ListItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React, { ChangeEvent } from "react"
import { removeTaskTC, updateTaskTC } from "../../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks"
import { EditableSpan } from "common/components"
import { getListItemSx } from "./Task.styles"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"
import type { RequestStatus } from "../../../../../../app/app-reducer"

export type Props = {
  task: DomainTask
  todolistId: string
  entityStatus: RequestStatus
}

export const Task = ({ task, todolistId, entityStatus }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const model: DomainTask = {
      ...task,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
    }

    dispatch(updateTaskTC(model))
  }

  const changeTaskTitleHandler = (title: string) => {
    const model: DomainTask = {
      ...task,
      title,
    }

    dispatch(updateTaskTC(model))
  }

  const disabled = task.status === TaskStatus.InProgress || entityStatus === "loading"

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} disabled={disabled} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}

import { Checkbox, IconButton, ListItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React from "react"
import { EditableSpan } from "common/components"
import { getListItemSx } from "./Task.styles"
import type { DomainTask, UpdateTaskModel } from "../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"
import type { RequestStatus } from "../../../../../../app/appSlice"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../../../api/tasksApi"

export type Props = {
  task: DomainTask
  todolistId: string
  entityStatus: RequestStatus
}

export const Task = ({ task, todolistId, entityStatus }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    deleteTask({ todolistId, taskId: task.id })
  }

  const changeTaskHandler = (args: Partial<DomainTask>) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...args,
    }
    updateTask({
      model,
      todolistId,
      taskId: task.id,
    })
  }

  const disabled = task.status === TaskStatus.InProgress || entityStatus === "loading"

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={(e) =>
            changeTaskHandler({ status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New })
          }
          disabled={disabled}
        />
        <EditableSpan title={task.title} changeTitle={(title) => changeTaskHandler({ title })} disabled={disabled} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}

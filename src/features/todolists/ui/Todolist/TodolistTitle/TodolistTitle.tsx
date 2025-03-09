import { IconButton } from "@mui/material"
import React from "react"
import { Delete } from "@mui/icons-material"
import { TodolistType } from "../../../model/todolistsSlice"
import { EditableSpan } from "common/components"
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../api/todolistsApi"

export type Props = {
  todolist: TodolistType
  disabled: boolean
}

export const TodolistTitle = ({ todolist, disabled }: Props) => {
  const { id, title } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const changeTaskTitleHandler = (title: string) => {
    updateTodolist({ id, title })
  }

  const removeTodolistHandler = () => {
    deleteTodolist(id)
  }

  return (
    <h3>
      <EditableSpan title={title} changeTitle={changeTaskTitleHandler} disabled={disabled} />
      <IconButton onClick={removeTodolistHandler} disabled={disabled}>
        <Delete />
      </IconButton>
    </h3>
  )
}

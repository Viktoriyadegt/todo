import { IconButton } from "@mui/material"
import React from "react"
import { Delete } from "@mui/icons-material"
import { removeTodolistTC, TodolistType, updateTodolistTitleTC } from "../../../model/todolists-reducer"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"

export type Props = {
  todolist: TodolistType
  disabled: boolean
}

export const TodolistTitle = ({ todolist, disabled }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTodolistTitleTC(id, title))
  }

  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(id))
  }

  return (
    <h3>
      <EditableSpan title={title} changeTitle={changeTaskTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={disabled}>
        <Delete />
      </IconButton>
    </h3>
  )
}

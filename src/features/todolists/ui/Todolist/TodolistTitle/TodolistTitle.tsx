import { IconButton } from "@mui/material"
import React from "react"
import { Delete } from "@mui/icons-material"
import {
  removeTodolistTC,
  TodolistType,
  updateTodolistTitleTC
} from "../../../model/todolists-reducer"
import { EditableSpan } from "common/components"
import { usAppDispatch } from "common/hooks"

export type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = usAppDispatch()

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTodolistTitleTC(id, title))
  }

  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(id))
  }

  return (
    <h3>
      <EditableSpan title={title} changeTitle={changeTaskTitleHandler} />
      <IconButton onClick={removeTodolistHandler}>
        <Delete  />
      </IconButton>
    </h3>
  )
}

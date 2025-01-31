import { List } from "@mui/material"
import React from "react"
import { Task } from "./task/Task"
import { selectTasks } from "../../../model/task-selector"
import { TodolistType } from "../../../model/todolists-reducer"
import { usAppSelector } from "common/hooks"

export type Props = {
  todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const tasks = usAppSelector(selectTasks)

  let tasksForTodolist = tasks[id]

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist.filter((f) => !f.isDone)
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist.filter((f) => f.isDone)
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <span>Тасок нет</span>
      ) : (
        <List>
          {tasksForTodolist.map((task) => {
            return <Task task={task} todolistId={id} />
          })}
        </List>
      )}
    </>
  )
}

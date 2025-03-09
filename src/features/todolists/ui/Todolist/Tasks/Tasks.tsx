import { List } from "@mui/material"
import React from "react"
import { type DomainTodolist } from "../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "../../../api/tasksApi"

export type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data } = useGetTasksQuery(id)

  let tasksForTodolist = data?.items

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist?.filter((f) => f.status === TaskStatus.New)
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist?.filter((f) => f.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <span>Тасок нет</span>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolistId={id} entityStatus={todolist.entityStatus} />
          })}
        </List>
      )}
    </>
  )
}

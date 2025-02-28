import { List } from "@mui/material"
import React, { useEffect } from "react"
import { type DomainTodolist } from "../../../model/todolistsSlice"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Task } from "./Task/Task"
import { fetchTasksTC, selectTasks } from "../../../model/tasksSlice"
import { TaskStatus } from "common/enums"

export type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  let tasksForTodolist = tasks[id]

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist.filter((f) => f.status === TaskStatus.New)
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist.filter((f) => f.status === TaskStatus.Completed)
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

import { List } from "@mui/material"
import React, {useEffect} from "react"
import { selectTasks } from "../../../model/task-selector"
import { TodolistType } from "../../../model/todolists-reducer"
import {usAppDispatch, usAppSelector} from "common/hooks"
import { Task } from "./Task/Task"
import {fetchTasksTC} from "../../../model/tasks-reducer";
import {TaskStatus} from "common/enums";

export type Props = {
  todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const tasks = usAppSelector(selectTasks)
  const dispatch = usAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, []);

  let tasksForTodolist = tasks[id]

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist.filter((f) => f.status===TaskStatus.New)
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist.filter((f) => f.status===TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <span>Тасок нет</span>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolistId={id} />
          })}
        </List>
      )}
    </>
  )
}

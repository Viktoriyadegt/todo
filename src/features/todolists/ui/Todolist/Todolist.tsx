import React from "react"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { type DomainTodolist } from "../../model/todolistsSlice"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { useCreateTaskMutation } from "../../api/tasksApi"

type TodolistPropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const { id, entityStatus } = todolist
  const [createTask] = useCreateTaskMutation()

  const addTaskHandler = (title: string) => {
    createTask({ todolistId: id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} disabled={entityStatus === "loading"} />
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}

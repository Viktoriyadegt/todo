import React from "react"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useAppDispatch } from "common/hooks/hooks"
import { addTaskTC } from "../../model/tasksSlice"
import { type DomainTodolist } from "../../model/todolistsSlice"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"

type TodolistPropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const { id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskTC({ todolistId: id, title }))
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

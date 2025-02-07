import React from "react"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { usAppDispatch } from "common/hooks/hooks"
import { addTaskAC } from "../../model/tasks-reducer"
import { TodolistType } from "../../model/todolists-reducer"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"

type TodolistPropsType = {
  todolist: TodolistType
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const dispatch = usAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}

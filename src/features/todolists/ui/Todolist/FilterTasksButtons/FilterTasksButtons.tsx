import { Box, Button } from "@mui/material"
import React from "react"
import { changeTodolistFilter, FilterType, TodolistType } from "../../../model/todolistsSlice"
import { filterButtonsContainerSx } from "./ FilterTasksButtons.styles"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterType) => {
    dispatch(changeTodolistFilter({ id, filter }))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "All" ? "contained" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("All")}
      >
        All
      </Button>
      <Button
        variant={filter === "Active" ? "contained" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("Active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "contained" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("Completed")}
      >
        Completed
      </Button>
    </Box>
  )
}

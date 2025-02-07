import React from "react"
import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { usAppDispatch } from "common/hooks/hooks"
import { Todolists } from "../features/todolists/ui/Todolists"
import { addTodolistAC } from "../features/todolists/model/todolists-reducer"

export const Main = () => {
  const dispatch = usAppDispatch()

  const addTodolistTitle = (title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }

  return (
    <Container fixed>
      <Grid2 container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolistTitle} />
      </Grid2>

      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  )
}

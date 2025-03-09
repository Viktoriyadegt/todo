import Container from "@mui/material/Container"
import React, { useEffect } from "react"
import { AddItemForm } from "common/components"
import { useAppSelector } from "common/hooks"
import { Todolists } from "../features/todolists/ui/Todolists"
import { Grid2 } from "@mui/material"
import { Path } from "common/routing/Routing"
import { useNavigate } from "react-router"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [createTodolist] = useCreateTodolistMutation()

  useEffect(() => {
    !isLoggedIn && navigate(Path.Login)
  }, [isLoggedIn])

  const addTodolistTitle = (title: string) => {
    createTodolist(title)
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

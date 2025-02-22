import Container from "@mui/material/Container"
import React, { useEffect } from "react"
import { AddItemForm } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists"
import { Grid2 } from "@mui/material"
import { selectIsLoggedIn } from "../features/auth/model/auth-selector"
import { Path } from "common/routing/Routing"
import { useNavigate } from "react-router"

export const Main = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    !isLoggedIn && navigate(Path.Login)
  }, [isLoggedIn])

  const addTodolistTitle = (title: string) => {
    dispatch(addTodolistTC(title))
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

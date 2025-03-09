import { Grid2, Paper } from "@mui/material"
import React from "react"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "../api/todolistsApi"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}

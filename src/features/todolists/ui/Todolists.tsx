import { Grid2, Paper } from "@mui/material"
import React, { useEffect } from "react"
import { Todolist } from "./Todolist/Todolist"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { fetchTodolistsTC, selectTodolists } from "../model/todolistsSlice"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => {
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

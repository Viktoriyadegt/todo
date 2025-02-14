import { Grid2, Paper } from "@mui/material"
import React, { useEffect } from "react"
import { Todolist } from "./Todolist/Todolist"
import { selectTodolists } from "../model/todolist-selector"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { fetchTodolistsTC } from "../model/todolists-reducer"

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

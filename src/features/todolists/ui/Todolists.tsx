import {Grid2, Paper} from "@mui/material"
import React, {useEffect} from "react"
import {Todolist} from "./Todolist/Todolist"
import {selectTodolists} from "../model/todolist-selector"
import {usAppDispatch, usAppSelector} from "common/hooks"
import {todolistsApi} from "../api/todolistsApi";
import {fetchTodolistsTC, setTodolistsAC} from "../model/todolists-reducer";

export const Todolists = () => {
    const todolists = usAppSelector(selectTodolists)
    const dispatch = usAppDispatch()


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, []);

    return (
        <>
            {todolists.map((tl) => {
                return (
                    <Grid2>
                        <Paper sx={{p: "0 20px 20px 20px"}}>
                            <Todolist key={tl.id} todolist={tl}/>
                        </Paper>
                    </Grid2>
                )
            })}
        </>
    )
}

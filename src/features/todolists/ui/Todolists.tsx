import {Grid2, Paper} from "@mui/material";
import React from "react";
import {Todolist} from "./todolist/Todolist";
import {usAppSelector} from "../../../app/hooks";
import {selectTodolists} from "../model/todolist-selector";


export const Todolists = () => {
    const todolists = usAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(tl => {
                return <Grid2>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <Todolist
                            key={tl.id}
                            todolist={tl}
                        />
                    </Paper>
                </Grid2>
            })}
        </>

    )
        ;
};


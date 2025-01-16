import React from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import {AddItemForm} from "../AddItemForm";
import {AppBar, Container, CssBaseline, Grid, IconButton, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "../MenuButton";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {usAppDispatch, usAppSelector} from "./hooks";
import {selectTodolists} from "../model/todolist-selector";
import {selectTasks} from "../model/task-selector";
import {selectThemeMode} from "../model/app-selector";
import {getTheme} from "./getTheme";
import {changeThemeModeAC} from "../model/app-reducer";


export type FilterTYpe = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterTYpe
}

type TaskType = {
    id: string
    isDone: boolean
    title: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {


    const todolists = usAppSelector(selectTodolists)
    const tasks = usAppSelector(selectTasks)
    const themeMode = usAppSelector(selectThemeMode)

    const dispatch = usAppDispatch()


    const theme = getTheme(themeMode)


    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC({todolistId, title}))
    }

    const changeFilter = (filter: FilterTYpe, id: string) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    const changeCheckedTask = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTodolistTitle = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }


    const changeModeHandler = () => {
        dispatch(changeThemeModeAC(themeMode == 'light' ? 'dark' : 'light'))
    }


    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position={'static'} sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <Menu/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addTodolistTitle}/>
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map(tl => {

                            let tasksForTodolist = tasks[tl.id]

                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(f => !f.isDone)
                            }

                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(f => f.isDone)
                            }
                            return <Grid item>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeCheckedTask={changeCheckedTask}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })}
                    </Grid>

                </Container>
            </ThemeProvider>
        </div>
    )

}

export default App;

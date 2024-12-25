import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Container,
    createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "./MenuButton";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model/tasks-reducer";


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

type ThemeMode = 'dark' | 'light'

function App() {


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#3F51B5',
            },
        },
    })

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All' },
        {id: todolistID2, title: 'What to buy', filter: 'All' },
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    const removeTask = (taskId: string, todolistId: string) => {
        dispatchTasks(removeTaskAC({ todolistId, taskId}))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC({todolistId, title}))
    }

    const changeFilter = (filter:FilterTYpe, id: string) => {
        dispatchTodolists(changeTodolistFilterAC(id, filter))
    }

    const changeCheckedTask = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchTasks(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC({todolistId, taskId,title}))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const addTodolistTitle = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC(id, title))
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }


    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position={'static'} sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <Menu/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
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

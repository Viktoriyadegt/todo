import React, {ChangeEvent} from 'react';
import {FilterTYpe} from "./app/App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterTYpe, todolistId: string) => void
    changeCheckedTask: (taskId: string, isDone: boolean, todolistId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    filter: FilterTYpe
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const changeFilterTasksHandler = (filter: FilterTYpe) => {
        props.changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const changeTaskTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTaskTitleHandler}/>
                <IconButton>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {props.tasks.length === 0
                ? <span>Тасок нет</span>
                : <List>
                    {props.tasks.map((task) => {
                        const removeTaskHandler = () => {
                            props.removeTask(task.id, props.todolistId)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckedTask(task.id, e.currentTarget.checked, props.todolistId)
                        }
                        const changeTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolistId, task.id, title)
                        }
                        return (
                            <ListItem key={task.id}
                                      sx={getListItemSx(task.isDone)}
                            >
                                <div>
                                    <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                                    <EditableSpan title={task.title} changeTitle={changeTitleHandler}/>
                                </div>
                                <IconButton>
                                    <Delete onClick={removeTaskHandler}/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button variant={props.filter === 'All' ? 'contained' : 'text'} color={'inherit'}
                        onClick={() => changeFilterTasksHandler('All')}>All</Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'text'} color={'primary'}
                        onClick={() => changeFilterTasksHandler('Active')}>Active</Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'text'} color={'secondary'}
                        onClick={() => changeFilterTasksHandler('Completed')}>Completed</Button>
            </Box>
        </div>
    )
        ;
};


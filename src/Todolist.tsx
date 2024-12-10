import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {FilterTYpe} from "./App";
import {AddItemForm} from "./AddItemForm";

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
    filter: FilterTYpe
    removeTodolist: (todolistId: string) => void
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


    return (
        <div>
            <h3>
                {props.title}
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {props.tasks.length === 0
                ? <span>Тасок нет</span>
                : <ul>
                    {props.tasks.map((task) => {
                        const removeTaskHandler = () => {
                            props.removeTask(task.id, props.todolistId)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckedTask(task.id, e.currentTarget.checked, props.todolistId)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                                <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                                <Button title={'x'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button className={props.filter === 'All' ? 'active-filter' : ''}
                        title={'All'} onClick={() => changeFilterTasksHandler('All')}/>
                <Button className={props.filter === 'Active' ? 'active-filter' : ''}
                        title={'Active'} onClick={() => changeFilterTasksHandler('Active')}/>
                <Button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        title={'Completed'} onClick={() => changeFilterTasksHandler('Completed')}/>
            </div>
        </div>
    )
        ;
};


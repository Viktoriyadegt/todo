import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {FilterTYpe} from "./App";

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
    addTask: (taskTitle: string, todolistId: string) => void
    filter: FilterTYpe
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [taskTitle, setTaskTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim(), props.todolistId)
            setTaskTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const changeTaskTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterTYpe) => {
        props.changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }


    return (
        <div>
            <h3>
                {props.title}
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleTaskHandler}
                       onKeyUp={onKeyUpHandler}/>
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
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


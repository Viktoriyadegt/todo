import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {FilterTYpe} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterTYpe) => void
    addTask: (taskTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [taskTitle, setTaskTitle] = useState<string>('')

    const addTaskHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterTYpe) => {
        props.changeFilter(filter)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleTaskHandler} onKeyUp={onKeyUpHandler}/>
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            {props.tasks.length === 0
                ? <span>Тасок нет</span>
                : <ul>
                    {props.tasks.map((task) => {
                        const removeTaskHandler = () => {
                            props.removeTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('All')}/>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('Active')}/>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('Completed')}/>
            </div>
        </div>
    )
        ;
};


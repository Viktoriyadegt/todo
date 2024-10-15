import React from 'react';
import {Button} from "./Button";
import {FilterTYpe} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterTYpe) => void
}

export const Todolist = (props: TodolistPropsType) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {props.tasks.length === 0
                ? <span>Тасок нет</span>
                : <ul>
                    {props.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => props.removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button title={'All'} onClick={() => props.changeFilter('All')}/>
                <Button title={'Active'} onClick={() => props.changeFilter('Active')}/>
                <Button title={'Completed'} onClick={() => props.changeFilter('Completed')}/>
            </div>
        </div>
    )
        ;
};


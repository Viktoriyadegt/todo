import React from 'react';
import {AddItemForm} from "../../../../common/components/AddItemForm";
import {FilterTasksButtons} from "./filterTasksButtons/FilterTasksButtons";
import {Tasks} from "./tasks/Tasks";
import {TodolistTitle} from "./todolistTitle/TodolistTitle";
import {usAppDispatch} from "../../../../app/hooks";
import { addTaskAC } from '../../model/tasks-reducer';
import {TodolistType} from "../../model/todolists-reducer";


type TodolistPropsType = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: TodolistPropsType) => {

    const dispatch = usAppDispatch()

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
        ;
};


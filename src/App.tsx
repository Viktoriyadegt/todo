import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const tasks1:Array<TaskType> = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
    ]

    const tasks2: Array<TaskType> = []

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1} date={Date()}/>
            <Todolist title={'Songs'} tasks={tasks2}/>
        </div>
    );
}

export default App;

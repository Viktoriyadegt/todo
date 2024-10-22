import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';


export type FilterTYpe = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ]
    )

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(f => f.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterTYpe) => {
        setFilter(filter)
    }

    let [filter, setFilter] = useState<FilterTYpe>('All')

    let tasksForTodolist = tasks;

    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(f => !f.isDone)
    }

    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(f => f.isDone)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterTYpe = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'Redux', isDone: false},
        ]
    )

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(f => f.id !== taskId))
    }

    const changeFilter = (filter: FilterTYpe) =>{
        setFilter(filter)
    }

    let [filter, setFilter] = useState<FilterTYpe>('All')

    let tasksForTodolist = tasks;

    if(filter==='Active'){
        tasksForTodolist = tasks.filter(f=> !f.isDone)
    }

    if(filter==='Completed'){
        tasksForTodolist = tasks.filter(f=> f.isDone)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

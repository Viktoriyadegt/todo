import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";


export type FilterTYpe = 'All' | 'Active' | 'Completed'

type TodolistType = {
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

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (filter: FilterTYpe, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const changeCheckedTask = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeTaskTitle = (todolistId: string, taskId:string, title: string) =>{
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolistTitle = (title: string) => {
        const todolistId = v1()
        setTodolists([{id: todolistId, title, filter: 'All'}, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTodolistTitle = (todolistId:string, title: string) => {
        setTodolists(todolists.map(tl=>tl.id===todolistId? {...tl, title} : tl))
    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolistTitle}/>

            {todolists.map(tl => {

                let tasksForTodolist = tasks[tl.id]

                if (tl.filter === 'Active') {
                    tasksForTodolist = tasksForTodolist.filter(f => !f.isDone)
                }

                if (tl.filter === 'Completed') {
                    tasksForTodolist = tasksForTodolist.filter(f => f.isDone)
                }
                return <Todolist
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
            })}

        </div>
    );
}

export default App;

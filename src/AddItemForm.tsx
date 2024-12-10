import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormType = {
    addItem: (title: string)=> void

}

export const AddItemForm = ({addItem}: AddItemFormType) => {
    let [taskTitle, setTaskTitle] = useState<string>('')

    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
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

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={taskTitle}
                   onChange={changeTaskTitleTaskHandler}
                   onKeyUp={onKeyUpHandler}/>
            <Button title={'+'} onClick={addTaskHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};


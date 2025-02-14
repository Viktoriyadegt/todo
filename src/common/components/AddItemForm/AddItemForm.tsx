import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import { AddBox } from "@mui/icons-material"

type AddItemFormType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = ({ addItem, disabled }: AddItemFormType) => {
  let [taskTitle, setTaskTitle] = useState<string>("")
  let [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim())
      setTaskTitle("")
    } else {
      setError("Title is required!")
    }
  }
  const changeTaskTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      addTaskHandler()
    }
  }

  return (
    <div>
      <TextField
        label={"Enter a text"}
        variant={"outlined"}
        className={error ? "error" : ""}
        value={taskTitle}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeTaskTitleTaskHandler}
        onKeyUp={onKeyUpHandler}
        disabled={disabled}
      />
      <IconButton onClick={addTaskHandler} color={"primary"} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
}

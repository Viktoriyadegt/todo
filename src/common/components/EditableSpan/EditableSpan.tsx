import React, { ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"

type EditableSpanType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")

  const activatedEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }

  const activatedViewMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField
      variant={"outlined"}
      size={"small"}
      value={title}
      onBlur={activatedViewMode}
      autoFocus
      onChange={onChangeTitle}
    />
  ) : (
    <span onDoubleClick={activatedEditMode}>{props.title}</span>
  )
}

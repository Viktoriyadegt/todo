import { type TaskPriority, TaskStatus } from "common/enums"

export type DomainTask = {
  id: string
  title: string
  description:  string
  todoListId: string
  order: number
  status: TaskStatus
  priority: TaskPriority
  startDate:  string
  deadline: string
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

import { type TaskPriority, TaskStatus } from "../../../common/enums/enums"

export type DomainTask = {
  id: string
  title: string
  description: null | string
  todoListId: string
  order: number
  status: TaskStatus
  priority: TaskPriority
  startDate: null | string
  deadline: null | string
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

import type { DomainTask, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import type { ResponseType } from "common/types/types"

export const tasksApi = {
  getTasks(id: string) {
    return instance.get<ResponseTaskType>(`todo-lists/${id}/tasks`)
  },

  createTask(payload: { title: string; todolistId: string }) {
    const { todolistId, title } = payload
    return instance.post<ResponseType<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },

  deleteTask(payload: { taskId: string; todolistId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTask(payload: { taskId: string; todolistId: string; model: UpdateTaskModel }) {
    const { taskId, todolistId, model } = payload
    return instance.put<ResponseType<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

export type ResponseTaskType = {
  items: DomainTask[]
  totalCount: number
  error: null | string
}

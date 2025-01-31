import type { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import type { ResponseType } from "common/types/types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: Todolist }>>(`todo-lists`, { title })
  },

  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },

  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<ResponseType>(`todo-lists/${id}`, { title })
  },
}

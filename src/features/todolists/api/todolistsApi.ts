import type { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import type { ResponseType } from "common/types/types"
import { DomainTodolist } from "../model/todolistsSlice"
import { baseApi } from "../../../app/baseApi"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: build.mutation<ResponseType<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: build.mutation<ResponseType, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolist: build.mutation<ResponseType, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useDeleteTodolistMutation,
  useCreateTodolistMutation,
  useUpdateTodolistMutation,
  useLazyGetTodolistsQuery,
} = todolistsApi

export const _todolistsApi = {
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

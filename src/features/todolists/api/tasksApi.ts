import type { DomainTask, UpdateTaskModel } from "./tasksApi.types"
import type { ResponseType } from "common/types/types"
import { baseApi } from "../../../app/baseApi"
import { instance } from "common/instance"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ResponseTaskType, string>({
      query: (id) => `todo-lists/${id}/tasks`,
      providesTags: ["Task"],
    }),
    createTask: build.mutation<ResponseType<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<ResponseType, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<
      ResponseType<{ item: DomainTask }>,
      { taskId: string; todolistId: string; model: Partial<UpdateTaskModel> }
    >({
      query: ({ taskId, todolistId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
        method: "PUT",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useUpdateTaskMutation, useDeleteTaskMutation, useCreateTaskMutation, useGetTasksQuery } = tasksApi

export const _tasksApi = {
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

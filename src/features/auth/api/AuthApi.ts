import { instance } from "common/instance"
import type { LoginArgs } from "./authApi.types"
import type { ResponseType } from "common/types"
import { baseApi } from "../../../app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ResponseType<{ id: number; token: string }>, LoginArgs>({
      query: (args) => ({
        url: `auth/login`,
        method: "POST",
        body: args,
      }),
    }),
    logout: build.mutation<ResponseType, void>({
      query: () => ({
        url: `auth/login`,
        method: "DELETE",
      }),
    }),
    me: build.query<ResponseType<{ id: number; email: string; login: boolean }>, void>({
      query: () => `auth/me`,
    }),
  }),
})

export const { useMeQuery, useLogoutMutation, useLoginMutation } = authApi

export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<ResponseType<{ id: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`)
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: boolean }>>(`auth/me`)
  },
}

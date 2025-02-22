import { instance } from "common/instance"
import type { LoginArgs } from "./authApi.types"
import type { ResponseType } from "common/types"

export const authApi = {
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

import type { ReactNode } from "react"
import { Navigate, Outlet } from "react-router"

type ProtectedRouteProps = {
  isLoggedIn: boolean
  redirectPath?: string
  children?: ReactNode
}

export const ProtectedRoute = ({ isLoggedIn, redirectPath = "/login", children }: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

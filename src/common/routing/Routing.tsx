import { Route, Routes } from "react-router"
import { Main } from "../../app/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "common/components"
import { Faq } from "common/components/protectedRoute/faq/Faq"
import { ProtectedRoute } from "common/components/protectedRoute/ProtectedRoute"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
  FAQ: "/faq",
} as const

type Props = {
  isLoggedIn: boolean
}

export const Routing = ({ isLoggedIn }: Props) => {
  return (
    <Routes>
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />

      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.FAQ} element={<Faq />} />
      </Route>
    </Routes>
  )
}

import s from "./Page404.module.css"
import { Button } from "@mui/material"
import { Link } from "react-router"
import { Path } from "common/routing/Routing"

export const Page404 = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button variant={"contained"} component={Link} to={Path.Main}>
        to the main page
      </Button>
    </div>
  )
}

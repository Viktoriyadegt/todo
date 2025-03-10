import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  type DomainTodolist,
  removeTodolist,
  todolistsReducer,
} from "../todolistsSlice"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "All", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "All", addedDate: "", order: 0, entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolist({ todolistId: todolistId1 }))

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const NewTodolistTitle = "New Todolist"

  const endState = todolistsReducer(
    startState,
    addTodolist({
      todolist: {
        id: v1(),
        title: NewTodolistTitle,
        addedDate: "",
        order: 0,
      },
    }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(NewTodolistTitle)
})

test("correct todolist should change its name", () => {
  const NewTodolistTitle = "New Todolist"

  const endState = todolistsReducer(startState, changeTodolistTitle({ title: NewTodolistTitle, id: todolistId2 }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(NewTodolistTitle)
})

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(startState, changeTodolistFilter({ id: todolistId2, filter: "Completed" }))

  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe("Completed")
})

import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType, updateTaskAC,
} from "../tasks-reducer"
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer"
import {TaskPriority, TaskStatus} from "common/enums";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatus.New,
                addedDate: '',
                todoListId: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            },
            {
                id: "2", title: "JS", status: TaskStatus.Completed,
                addedDate: '',
                todoListId: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            },
            {
                id: "3", title: "React", status: TaskStatus.New,
                addedDate: '',
                todoListId: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            },
        ],
        todolistId2: [
            {
                id: "1", title: "bread", status: TaskStatus.New,
                addedDate: '',
                todoListId: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            },
            {
                id: "2", title: "milk", status: TaskStatus.New,
                addedDate: '',
                todoListId: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            },
            {
                id: "3", title: "tea", status: TaskStatus.New,
                addedDate: '',
                todoListId: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            },
        ],
    }
})

test("correct task should be deleted from correct array", () => {
    const endState = tasksReducer(startState, removeTaskAC({todolistId: "todolistId2", taskId: "2"}))

    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"][1].id).toBe('3')
})

test("correct task should be added to correct array", () => {
    const endState = tasksReducer(startState, addTaskAC({
        task: {
            id: "2", title: "juce", status: TaskStatus.New,
            addedDate: '',
            todoListId: "todolistId2",
            order: 0,
            deadline: '',
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        }
    }))

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
})

test("status of specified task should be changed", () => {
    const endState = tasksReducer(
        startState,
        updateTaskAC({
            task: {
                todoListId: "todolistId2",
                id: "2", title: "milk", status: TaskStatus.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            }
        }),
    )

    expect(endState["todolistId2"][1].status).toBe(TaskStatus.Completed)
    expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed)
    expect(endState["todolistId2"][1].title).toBe("milk")
})

test("title of specified task should be changed", () => {
    const endState = tasksReducer(
        startState,
        updateTaskAC({
            task: {
                todoListId: "todolistId2",
                id: "2", title: "tea", status: TaskStatus.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriority.Low
            }
        }),
    )

    expect(endState["todolistId2"][1].title).toBe("tea")
    expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new Todolist is added", () => {
    const endState = tasksReducer(startState, addTodolistAC({todolist: {id: "todolistId3", title: 'new todo', order: 0, addedDate: ''}}))

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
    const action = removeTodolistAC({todolistId: "todolistId2"})

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    expect(endState["todolistId2"]).toBeUndefined()
})

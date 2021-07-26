import {v1} from "uuid";
import {TasksType} from "../App";
// @ts-ignore
import {ActionTypeAddTodoList, RemoveTodoList} from "./todoList-reducer";


//
export type ActionTypeRemoveTask = {
    type: 'REMOVE-TASK'
    todoID: string
    idTask: string
}
export type ActionTypeAddTask = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatus = {
    type: "CHANGE-TASK-STATUS"
    todoID: string
    idTask: string
    bool: boolean
}
export type ChangeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    todoID: string
    title: string
    idTask: string
}
//
export type ActionType =
    ChangeTaskTitle
    | ChangeTaskStatus
    | ActionTypeAddTask
    | ActionTypeRemoveTask
    | ActionTypeAddTodoList
    | RemoveTodoList
//
export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    let stateCopy;
    let task;
    switch (action.type) {
        case "REMOVE-TASK" :
            stateCopy = {...state}
            task = state[action.todoID]
            const filteredTask = task.filter(f => f.id !== action.idTask)
            stateCopy[action.todoID] = filteredTask
            return stateCopy
        //
        case "ADD-TASK" :
            stateCopy = {...state}
            //task = state[action.todoID]
            const newTask = {id: v1(), title: action.title, isDone: false};
            stateCopy[action.todolistId] = [newTask, ...state[action.todolistId]]
            return stateCopy
        //
        case "CHANGE-TASK-STATUS" :
            stateCopy = {...state}
            task = state[action.todoID]
            const newStatus = task.map((t) => {
                return t.id === action.idTask ? {...t, isDone: action.bool} : t
            })
            stateCopy[action.todoID] = newStatus
            return stateCopy
        //
        case "CHANGE-TASK-TITLE" :
            stateCopy = {...state}
            task = state[action.todoID]
            const newTitle = task.map((t) => {
                return t.id === action.idTask ? {...t, title: action.title} : t
            })
            stateCopy[action.todoID] = newTitle
            return stateCopy
        //
        case "ADD-TODOLIST":
            stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        //
        case "REMOVE-TODOLIST":
            stateCopy = {...state}
            delete stateCopy[action.todoID]
            return stateCopy
        default :
            return state
    }
}

//
export const removeTaskAC = (idTask: string, todoID: string):
    ActionTypeRemoveTask => {
    return {type: "REMOVE-TASK", idTask, todoID}
}
//
export const addTaskAC = (title: string, todolistId: string): ActionTypeAddTask => {
    return {type: "ADD-TASK", todolistId, title}
}
//
export const changeTaskStatusAC = (idTask: string, bool: boolean, todoID: string): ChangeTaskStatus => {
    return {type: 'CHANGE-TASK-STATUS', idTask, bool, todoID}
}
//
export const changeTaskTitleAC = (idTask: string, title: string, todoID: string): ChangeTaskTitle => {
    return {type: 'CHANGE-TASK-TITLE', idTask, title, todoID}
}


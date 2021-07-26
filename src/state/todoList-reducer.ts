import {v1} from "uuid";

export type TodolistType = {
    id: string
    title: string
    filter: string
}
//
export type ActionTypeAddTodoList = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ActionTypeChangeTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoID: string
}
export type ChangeTodoListFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    todoID: string
    filter: string
}
export type RemoveTodoList = {
    type: 'REMOVE-TODOLIST'
    todoID: string
}
//
export type ActionType = RemoveTodoList | ChangeTodoListFilter | ActionTypeAddTodoList | ActionTypeChangeTitle
//
export const todoListReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD-TODOLIST' :
            const todoListID = v1();
            const newTodoList = {
                id: todoListID,
                title: action.title,
                filter: 'all',
            };
            return [
                ...state,
                newTodoList
            ]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map((t) => {
                if (t.id === action.todoID) {
                    return {...t, title: action.title};
                } else {
                    return t;
                }
            })
        case "CHANGE-TODOLIST-FILTER" :
            return state.map((tl) => {
                if (tl.id === action.todoID) {
                    return {...tl, filter: action.filter};
                } else {
                    return tl;
                }
            });
        case "REMOVE-TODOLIST" :
            return state.filter((f) => f.id !== action.todoID)
        default :
            return state
    }
}
//
export const RemoveTodoListAC = (todoID: string): RemoveTodoList => {
    return {type: "REMOVE-TODOLIST", todoID}
}
//
export const ChangeFilterTodoListAC = (todoID: string, filter: string): ChangeTodoListFilter => {
    return {type: "CHANGE-TODOLIST-FILTER", todoID, filter}
}
//
export const ChangeTitleTodoListAC = (title: string, todoID: string): ActionTypeChangeTitle => {
    return {type: "CHANGE-TODOLIST-TITLE", title, todoID}
}
//
export const AddTodoListAC = (title: string): ActionTypeAddTodoList => {
    return {type: "ADD-TODOLIST", title}
}
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
    todolistId: string
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
// export let todoListID_1 = v1();
// export let todoListID_2 = v1();
//
let initialState:Array<TodolistType> = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all'},
    // {id: todoListID_2, title: 'What to buy', filter: 'all'},
]
export const todoListReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD-TODOLIST' :

            const newTodoList = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            };
            return [

                newTodoList,
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map((t) => {
                if (t.id === action.todoID) {
                    return {...t, title: action.title};
                } else {
                    return {...t};
                }
            })
        case "CHANGE-TODOLIST-FILTER" :
            return state.map((tl) => {
                if (tl.id === action.todoID) {
                    return {...tl, filter: action.filter};
                } else {
                    return {...tl};
                }
            });
        case "REMOVE-TODOLIST" :
            return state.filter((f) => f.id !== action.todoID)
        default :
            return state
    }
}
//
export const removeTodoListAC = (todoID: string): RemoveTodoList => {
    return {type: "REMOVE-TODOLIST", todoID}
}
//
export const changeFilterTodoListAC = (todoID: string, filter: string): ChangeTodoListFilter => {
    return {type: "CHANGE-TODOLIST-FILTER", todoID, filter}
}
//
export const changeTitleTodoListAC = (title: string, todoID: string): ActionTypeChangeTitle => {
    return {type: "CHANGE-TODOLIST-TITLE", title, todoID}
}
//
export const addTodoListAC = (title: string): ActionTypeAddTodoList => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListReducer, TodolistType} from "./todoListReducer";
import {v1} from "uuid";


const reducerPac = combineReducers({
    todoListReducer,
    tasksReducer

})

// type AppReducerPacState = {
//     todoListReducer:Array<TodolistType>,
//     tasksReducer:TasksType
// }
export type AppRootState = ReturnType<typeof reducerPac>

export const store = createStore(reducerPac)


// @ts-ignore
window.store = store
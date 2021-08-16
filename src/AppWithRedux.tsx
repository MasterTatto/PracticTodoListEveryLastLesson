import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from '@material-ui/core';

import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import ButtonForm from './ButtonForm';
import {TaskType, Todolist} from './Todolist';
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todoListReducer
} from "./state/todoListReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type filterValue = 'all' | 'active' | 'completed';

type TodoListsType = {
    id: string;
    title: string;
    filter: string;
};
export type TasksType = {
    [key: string]: Array<TaskType>;
};


function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoListReducer)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasksReducer)
    console.log(todoLists)
    // let todoListID_1 = v1();
    // let todoListID_2 = v1();
    // //
    // const [todoLists, dispatchToTodoListReducer] = useReducer(todoListReducer, [
    //     {id: todoListID_1, title: 'What to learn', filter: 'all'},
    //     {id: todoListID_2, title: 'What to buy', filter: 'all'},
    // ]);
    // //
    // const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    //     [todoListID_1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Redux', isDone: false},
    //         {id: v1(), title: 'Git', isDone: false},
    //     ],
    //     [todoListID_2]: [
    //         {id: v1(), title: 'cheeps', isDone: false},
    //         {id: v1(), title: 'milk', isDone: true},
    //         {id: v1(), title: 'bread', isDone: false},
    //     ],
    // });
    //

    //
    function addTask(v: string, todoID: string) {
        const action = addTaskAC(v, todoID)
        dispatch(action)
    }

    //
    function removeTask(idTask: string, todoID: string) {
        const action = removeTaskAC(idTask, todoID)
        dispatch(action)
    }

    //
    function changeChecked(id: string, bool: boolean, todoID: string) {
        const action = changeTaskStatusAC(id, bool, todoID)
        dispatch(action)
    }

    //
    function addNewTitleTasks(id: string, title: string, todoID: string) {
        const action = changeTaskTitleAC(id, title, todoID)
        dispatch(action)
    }

    //

    function removeTodo(todoID: string) {
        const action = removeTodoListAC(todoID)
        dispatch(action)

    }

    //
    function addTodoLists(title: string) {
        const action = addTodoListAC(title)
        dispatch(action)

    }

    //
    function addFilterBtn(f: filterValue, todoID: string) {
        const action = changeFilterTodoListAC(todoID, f)
        dispatch(action)
    }

    //
    function addNewTitleTodoLists(title: string, todoID: string) {
        const action = changeTitleTodoListAC(title, todoID)
        dispatch(action)
    }

    //

    return (
        <div className='App'>
            <AppBar position='static'>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton edge='start' color='inherit' aria-label='menu'>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6'>News</Typography>
                    </div>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid
                    container
                    style={{
                        padding: '20px',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        maxWidth: '345px',
                        marginTop: '20px'
                    }}
                >
                    <ButtonForm addItem={addTodoLists}/>
                </Grid>

                <Grid container spacing={4}>
                    {todoLists.map((tl) => {
                        function windowTask() {
                            if (tl.filter === 'active') {
                                return tasks[tl.id].filter((f) => f.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                return tasks[tl.id].filter((f) => f.isDone === true);
                            } else {
                                return tasks[tl.id];
                            }
                        }

                        return (
                            <>
                                <Grid item key={tl.id}>
                                    <Paper
                                        elevation={3}
                                        style={{
                                            padding: '20px',
                                            paddingTop: '0',
                                            borderRadius: '20px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={windowTask()}
                                            removeTask={removeTask}
                                            addFilterBtn={addFilterBtn}
                                            addTask={addTask}
                                            changeChecked={changeChecked}
                                            filter={tl.filter}
                                            removeTodo={removeTodo}
                                            addNewTitle={addNewTitleTasks}
                                            addNewTitleTodoLists={addNewTitleTodoLists}
                                        />
                                    </Paper>
                                </Grid>
                            </>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

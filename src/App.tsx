import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
export type filterValue = 'all' | 'active' | 'completed';
type TodoListType = {
	id: string;
	title: string;
	filter: filterValue;
};
function App() {
	//const [filter, setFilter] = useState<filterValue>('all');
	//
	const todoList_1 = v1();
	const todoList_2 = v1();
	//
	const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
		{ id: todoList_1, title: 'What to learn', filter: 'all' },
		{ id: todoList_2, title: 'What to buy', filter: 'all' },
	]);
	const [tasks, setTask] = useState({
		[todoList_1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'Git', isDone: false },
		],
		[todoList_2]: [
			{ id: v1(), title: 'bread', isDone: false },
			{ id: v1(), title: 'milk', isDone: true },
			{ id: v1(), title: 'chees', isDone: false },
		],
	});
	// const [tasks, setTask] = useState([
	// 	{ id: v1(), title: 'HTML&CSS', isDone: true },
	// 	{ id: v1(), title: 'JS', isDone: true },
	// 	{ id: v1(), title: 'ReactJS', isDone: false },
	// 	{ id: v1(), title: 'Redux', isDone: false },
	// 	{ id: v1(), title: 'Git', isDone: false },
	// ]);
	//
	function changeChecked(id: string, bool: boolean, todoID: string) {
		tasks[todoID] = tasks[todoID].map((t) =>
			t.id === id ? { ...t, isDone: bool } : t
		);
		setTask({ ...tasks });
	}
	//
	function addTask(v: string, todoID: string) {
		const newTask = { id: v1(), title: v, isDone: false };
		tasks[todoID] = [newTask, ...tasks[todoID]];
		setTask({ ...tasks });
	}
	//
	function addFilterBtn(f: filterValue, todoID: string) {
		let todo = todoLists.map((tl) => {
			if (tl.id === todoID) {
				return { ...tl, filter: f };
			} else {
				return tl;
			}
		});
		setTodoLists(todo);
	}
	//
	function windowTask(tl: TodoListType) {
		if (tl.filter === 'active') {
			return tasks[tl.id].filter((f) => f.isDone === false);
		}
		if (tl.filter === 'completed') {
			return tasks[tl.id].filter((f) => f.isDone === true);
		} else {
			return tasks[tl.id];
		}
	}

	//
	function removeTask(idTask: string, todoID: string) {
		tasks[todoID] = tasks[todoID].filter((f) => {
			if (f.id !== idTask) {
				return true;
			} else {
				return false;
			}
		});
		setTask({ ...tasks });
	}
	//
	function removeTodo(id: string) {
		let todoRemove = todoLists.filter((f) => {
			if (f.id !== id) {
				return true;
			} else {
				return false;
			}
		});
		setTodoLists(todoRemove);
		delete tasks[id];
	}
	return (
		<div className='App'>
			{todoLists.map((tl) => {
				const filterWindow = windowTask(tl);
				return (
					<Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={filterWindow}
						removeTask={removeTask}
						addFilterBtn={addFilterBtn}
						addTask={addTask}
						changeChecked={changeChecked}
						filter={tl.filter}
						removeTodo={removeTodo}
					/>
				);
			})}
		</div>
	);
}

export default App;

import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
export type filterValue = 'all' | 'active' | 'completed';
type todoListsType = {
	id: string;
	title: string;
	filter: string;
};
function App() {
	//
	const todoID_1 = v1();
	const todoID_2 = v1();
	const todoID_3 = v1();
	//
	const [todoLists, setTodoLists] = useState<Array<todoListsType>>([
		{ id: todoID_1, title: 'What we learn', filter: 'all' },
		{ id: todoID_2, title: 'What we buy', filter: 'all' },
		{ id: todoID_3, title: 'What you like', filter: 'all' },
	]);
	//
	const [tasks, setTask] = useState({
		[todoID_1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'Git', isDone: false },
		],
		[todoID_2]: [
			{ id: v1(), title: 'bread', isDone: true },
			{ id: v1(), title: 'milk', isDone: false },
			{ id: v1(), title: 'cheps', isDone: true },
		],
		[todoID_3]: [
			{ id: v1(), title: 'music', isDone: false },
			{ id: v1(), title: 'cinema', isDone: true },
			{ id: v1(), title: 'animal', isDone: false },
		],
	});
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
		let todoList = todoLists.map((tl) => {
			if (tl.id === todoID) {
				return { ...tl, filter: f };
			} else {
				return tl;
			}
		});
		setTodoLists(todoList);
	}
	//

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
	function removeTodo(todoID: string) {
		let remove = todoLists.filter((f) => {
			if (f.id !== todoID) {
				return true;
			} else {
				return false;
			}
		});
		setTodoLists(remove);
		delete tasks[todoID];
	}
	return (
		<div className='App'>
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
					/>
				);
			})}
		</div>
	);
}

export default App;

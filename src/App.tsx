import React, { useState } from 'react';
import { TLSSocket } from 'tls';
import { v1 } from 'uuid';
import AddInputForm from './AddInputForm';
import './App.css';
import { Todolist } from './Todolist';
export type filterValue = 'all' | 'active' | 'completed';
function App() {
	//
	const todoID_1 = v1();
	const todoID_2 = v1();
	//
	const [todoLists, setTodoLists] = useState([
		{ id: todoID_1, title: 'What to learn', filter: 'all' },
		{ id: todoID_2, title: 'What to buy', filter: 'all' },
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
			{ id: v1(), title: 'cheeps', isDone: false },
			{ id: v1(), title: 'bread', isDone: true },
			{ id: v1(), title: 'milk', isDone: false },
		],
	});
	//
	function addTodoList(value: string) {
		const todoListID = v1();
		const newTodoList = { id: todoListID, title: value, filter: 'all' };
		setTodoLists([newTodoList, ...todoLists]);
		setTask({ ...tasks, [todoListID]: [] });
	}
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
		const newWindow = todoLists.map((tlFilter) => {
			if (tlFilter.id === todoID) {
				return { ...tlFilter, filter: f };
			} else {
				return tlFilter;
			}
		});
		setTodoLists(newWindow);
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
		const remodeTodoList = todoLists.filter((f) => {
			if (f.id !== todoID) {
				return true;
			} else {
				return false;
			}
		});
		setTodoLists(remodeTodoList);
	}
	//
	function changeTaskTitle(id: string, title: string, todoID: string) {
		tasks[todoID] = tasks[todoID].map((t) =>
			t.id === id ? { ...t, title } : t
		);
		setTask({ ...tasks });
	}
	function changeTodoTitle(title: string, todoID: string) {
		const change = todoLists.map((t) =>
			t.id === todoID ? { ...t, title } : t
		);
		setTodoLists(change);
	}
	return (
		<div className='App'>
			<AddInputForm addItem={addTodoList} />
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
						changeTaskTitle={changeTaskTitle}
						changeTodoTitle={changeTodoTitle}
					/>
				);
			})}
		</div>
	);
}

export default App;

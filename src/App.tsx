import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
export type filterValue = 'all' | 'active' | 'completed';
function App() {
	const [filter, setFilter] = useState<filterValue>('all');
	//
	const [tasks, setTask] = useState([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'Git', isDone: false },
	]);
	//
	function changeChecked(id:string,bool:boolean) {
		const newTask = tasks.map((t) => t.id === id ? {...t, isDone:bool} : t) 
		setTask(newTask)
	}
	//
	function addTask(v: string) {
		const newTask = { id: v1(), title: v, isDone: false };
		const newtasks = [newTask,...tasks]
		setTask(newtasks)
	}
	//
	function addFilterBtn(f: filterValue) {
		setFilter(f);
	}
	//
	function windowTask() {
		if (filter === 'active') {
			return tasks.filter((f) => f.isDone === false);
		}
		if (filter === 'completed') {
			return tasks.filter((f) => f.isDone === true);
		} else {
			return tasks;
		}
	}
	//
	function removeTask(idTask: string) {
		const newTask = tasks.filter((f) => {
			if (f.id !== idTask) {
				return true;
			} else {
				return false;
			}
		});
		setTask(newTask);
	}
	return (
		<div className='App'>
			<Todolist
				title='What to learn'
				tasks={windowTask()}
				removeTask={removeTask}
				addFilterBtn={addFilterBtn}
				addTask={addTask}
				changeChecked={changeChecked}
				filter={filter}
			/>
		</div>
	);
}

export default App;

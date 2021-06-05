import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import ButtonForm from './ButtonForm';
import { TaskType, Todolist } from './Todolist';
export type filterValue = 'all' | 'active' | 'completed';
type TodoListsType = {
	id: string;
	title: string;
	filter: string;
};
type TasksType = {
	[key: string]: Array<TaskType>;
};
function App() {
	const todoListID_1 = v1();
	const todoListID_2 = v1();
	//
	const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
		{ id: todoListID_1, title: 'What to learn', filter: 'all' },
		{ id: todoListID_2, title: 'What to buy', filter: 'all' },
	]);
	//
	const [tasks, setTask] = useState<TasksType>({
		[todoListID_1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'Git', isDone: false },
		],
		[todoListID_2]: [
			{ id: v1(), title: 'cheeps', isDone: false },
			{ id: v1(), title: 'milk', isDone: true },
			{ id: v1(), title: 'bread', isDone: false },
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
		const newFilter = todoLists.map((tl) => {
			if (tl.id === todoID) {
				return { ...tl, filter: f };
			} else {
				return tl;
			}
		});
		setTodoLists(newFilter);
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
		const todo = todoLists.filter((f) => f.id !== todoID);
		setTodoLists(todo);
	}
	//
	function addTodoLists(title: string) {
		const todoListID = v1();
		const newTodoList = {
			id: todoListID,
			title,
			filter: 'all',
		};
		setTodoLists([newTodoList, ...todoLists]);
		setTask({ ...tasks, [todoListID]: [] });
	}
	//
	function addNewTitleTasks(id: string, title: string, todoID: string) {
		tasks[todoID] = tasks[todoID].map((t) => {
			if (t.id === id) {
				return { ...t, title: title };
			} else {
				return t;
			}
		});
		setTask({ ...tasks });
	}
	//
	function addNewTitleTodoLists(title: string, todoID: string) {
		const newTodo = todoLists.map((t) => {
			if (t.id === todoID) {
				return { ...t, title };
			} else {
				return t;
			}
		});
		setTodoLists(newTodo);
	}
	//
	return (
		<div className='App'>
			<ButtonForm addItem={addTodoLists} />
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
						addNewTitle={addNewTitleTasks}
						addNewTitleTodoLists={addNewTitleTodoLists}
					/>
				);
			})}
		</div>
	);
}

export default App;

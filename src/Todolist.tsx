import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { filterValue } from './App';
import ButtonForm from './ButtonForm';
import EditSpan from './EditSpan';

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

type PropsType = {
	title: string;
	tasks: Array<TaskType>;
	removeTask: (id: string, todoID: string) => void;
	addFilterBtn: (v: filterValue, todoID: string) => void;
	addTask: (v: string, todoID: string) => void;
	changeChecked: (id: string, bool: boolean, todoID: string) => void;
	filter: string;
	id: string;
	removeTodo: (id: string) => void;
	addNewTitle: (id: string, title: string, todoID: string) => void;
	addNewTitleTodoLists: (id: string, title: string) => void;
};

export function Todolist(props: PropsType) {
	const liItem = props.tasks.map((t) => {
		const removeTask = () => props.removeTask(t.id, props.id);
		//
		function changeTitle(title: string) {
			props.addNewTitle(t.id, title, props.id);
		}
		//
		return (
			<li className={t.isDone ? 'done' : ''} key={t.id}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={(e) =>
						props.changeChecked(t.id, e.currentTarget.checked, props.id)
					}
				/>
				<EditSpan title={t.title} changeTitle={changeTitle} />
				<button onClick={removeTask}>X</button>
			</li>
		);
	});
	//
	function addTask(title: string) {
		props.addTask(title, props.id);
	}
	//
	function editTodolist(title: string) {
		props.addNewTitleTodoLists(title, props.id);
	}
	//
	return (
		<div>
			<h3>
				<EditSpan title={props.title} changeTitle={editTodolist} />{' '}
				<button onClick={() => props.removeTodo(props.id)}>X</button>
			</h3>
			<ButtonForm addItem={addTask} />
			<ul>{liItem}</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'btn' : ''}
					onClick={() => props.addFilterBtn('all', props.id)}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'btn' : ''}
					onClick={() => props.addFilterBtn('active', props.id)}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'btn' : ''}
					onClick={() => props.addFilterBtn('completed', props.id)}
				>
					Completed
				</button>
			</div>
		</div>
	);
}

import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { filterValue } from './App';

type TaskType = {
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
	removeTodo:(id:string) => void
};

export function Todolist(props: PropsType) {
	const liItem = props.tasks.map((t) => {
		const removeTask = () => props.removeTask(t.id, props.id);
		//
		return (
			<li className={t.isDone ? 'done' : ''}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={(e) =>
						props.changeChecked(t.id, e.currentTarget.checked, props.id)
					}
				/>
				<span>{t.title}</span>
				<button onClick={removeTask}>X</button>
			</li>
		);
	});
	//
	const [value, setValue] = useState('');
	//
	const [error, setError] = useState(false);
	//
	const noSpace = value.trim();
	//
	const addInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
		setError(false);
	};
	//
	const addValueBtn = () => {
		if (noSpace) {
			props.addTask(noSpace, props.id);
			setValue('');
		} else {
			setError(true);
		}
	};
	//
	const addValueEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && noSpace) {
			props.addTask(noSpace, props.id);
			setValue('');
		} else {
			setError(true);
		}
	};
	return (
		<div>
			<h3>
				{props.title} <button onClick={() => props.removeTodo(props.id)}>X</button>{' '}
			</h3>
			<div>
				<input
					className={error ? 'error' : ''}
					value={value}
					onChange={addInputValue}
					onKeyPress={addValueEnter}
				/>
				<button onClick={addValueBtn}>+</button>
			</div>
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

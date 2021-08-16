import {
	Button,
	Checkbox,
	IconButton,

} from '@material-ui/core';
import React from 'react';
import { filterValue } from './App';
import ButtonForm from './ButtonForm';
import EditSpan from './EditSpan';
import { Delete } from '@material-ui/icons';
//
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
				<Checkbox
					name='checkedB'
					color='primary'
					checked={t.isDone}
					onChange={(e) =>
						props.changeChecked(t.id, e.currentTarget.checked, props.id)
					}
				/>
				<EditSpan title={t.title} changeTitle={changeTitle} />

				<IconButton aria-label='delete' color='secondary' onClick={removeTask}>
					<Delete />
					{/* <DeleteForeverIcon  /> */}
				</IconButton>
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
				<IconButton
					aria-label='delete'
					color='primary'
					onClick={() => props.removeTodo(props.id)}
				>
					<Delete />
					{/* <DeleteForeverIcon  /> */}
				</IconButton>
			</h3>
			<ButtonForm addItem={addTask} />
			<ul>{liItem}</ul>
			<div>
				<Button
					variant={props.filter === 'all' ? 'contained' : 'text'}
					onClick={() => props.addFilterBtn('all', props.id)}
				>
					All
				</Button>
				<Button
					color='primary'
					variant={props.filter === 'active' ? 'contained' : 'text'}
					onClick={() => props.addFilterBtn('active', props.id)}
				>
					Active
				</Button>
				<Button
					color='secondary'
					variant={props.filter === 'completed' ? 'contained' : 'text'}
					onClick={() => props.addFilterBtn('completed', props.id)}
				>
					Completed
				</Button>
			</div>
		</div>
	);
}

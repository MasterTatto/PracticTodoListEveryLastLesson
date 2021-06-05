import { Button, Icon, IconButton, TextField } from '@material-ui/core';
import { Delete, TextFields } from '@material-ui/icons';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
//
type ButtonFormPropsType = {
	addItem: (title: string) => void;
};
//
function ButtonForm(props: ButtonFormPropsType) {
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
			props.addItem(noSpace);
			setValue('');
		} else {
			setError(true);
		}
	};
	//
	const addValueEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && noSpace) {
			props.addItem(noSpace);
			setValue('');
		} else {
			setError(true);
		}
	};
	//
	return (
		<div>
			<TextField
				id='outlined-basic'
				label='Add item...'
				variant='outlined'
				className={error ? 'error' : ''}
				size={'small'}
				value={value}
				onChange={addInputValue}
				onKeyPress={addValueEnter}
				error={error}
				helperText = {error ? 'Incorrect value' : ''}
			/>

			<Button
				onClick={addValueBtn}
				variant='contained'
				color='primary'
				//   className={classes.button}
				endIcon={<Icon>send</Icon>}
			>
				send
			</Button>
		</div>
	);
}

export default ButtonForm;

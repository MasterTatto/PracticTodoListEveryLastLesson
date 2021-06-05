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
			<input
				className={error ? 'error' : ''}
				value={value}
				onChange={addInputValue}
				onKeyPress={addValueEnter}
			/>
			<button onClick={addValueBtn}>+</button>
		</div>
	);
}

export default ButtonForm;

import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
type EditSpanPropsType = {
	title: string;
	changeTitle: (title: string) => void;
};
function EditSpan(props: EditSpanPropsType) {
	const [activeEdit, setactiveEdit] = useState(false);
	//
	const [value, setValue] = useState(props.title);
	//
	function OnActiveEdit() {
		setactiveEdit(true);
	}
	//
	function OffActiveEdit() {
		setactiveEdit(false);
		props.changeTitle(value);
	}
	return activeEdit ? (
		<TextField
			id='standard-basic'
			label='Type changes'
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
			autoFocus
			onBlur={OffActiveEdit}
			size={'small'}
			onKeyPress={(e) => {
				if (e.key === 'Enter') {
					setactiveEdit(false);
					props.changeTitle(value);
				}
			}}
		/>
	) : (
		<span onDoubleClick={OnActiveEdit}>{props.title}</span>
	);
}

export default EditSpan;

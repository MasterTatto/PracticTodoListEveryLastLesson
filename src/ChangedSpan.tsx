import React, { useState } from 'react';
type ChangedSpanPropsType = {
	title: string;
	changeTitle: (title: string) => void;
};

function ChangedSpan(props: ChangedSpanPropsType) {
	const [activeEdit, setEctiveEdit] = useState(false);
	const [value, SetValue] = useState(props.title);
	//
	function OnEditSpan() {
		setEctiveEdit(true);
		props.changeTitle(value);
	}
	function OffEditSpan() {
		setEctiveEdit(false);
	}
	return activeEdit ? (
		<input
			autoFocus
			onBlur={OffEditSpan}
			// value={value}
			onChange={(e) => SetValue(e.currentTarget.value)}
			onKeyPress={(e) => {
				if (e.key === 'Enter') {
					props.changeTitle(value);
					OffEditSpan();
				}
			}}
		/>
	) : (
		<span onDoubleClick={OnEditSpan}>{props.title}</span>
	);
}

export default ChangedSpan;

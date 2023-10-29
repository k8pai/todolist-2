'use client';

import { postTodos } from '@/lib/client';
import { Task } from '@/typings';
import { Input } from '@nextui-org/react';
import React, { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

const FormInput = () => {
	const [state, setState] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: Task = {
			id: uuid(),
			task: state,
			created_at: Date.now(),
			completed: false,
		};

		console.log('data => ', data);
		let status = postTodos(data);
		console.log('status= > ', status);
		if (status) {
			setState('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				isClearable
				type="text"
				variant="bordered"
				placeholder="Enter task"
				value={state}
				onClear={() => setState('')}
				onChange={(e) => setState(e.target.value)}
				className="max-w-3xl w-full "
				classNames={{
					base: 'rounded-sm focus:border-white',
					input: '',
					inputWrapper:
						'rounded-lg py-2 border-transparent group-data-[focus=true]:border-white bg-zinc-900',
				}}
			/>
			<input type="submit" className="hidden" />
		</form>
	);
};

export default FormInput;

'use client';

import FormInput from '@/components/FormInput';
import Tasks from '@/components/Tasks';
import { deleteTodos, getTodos, postTodos } from '@/lib/client';
import { filters } from '@/lib/filters';
import { localStorageKey } from '@/lib/keys';
import { Task } from '@/typings';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { FormEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

export default function Home() {
	const [state, setState] = useState<string>('');
	const [todos, setTodos] = useState<Task[]>([]);

	// Load todos from local storage on component mount
	useEffect(() => {
		const storedTodos = JSON.parse(
			localStorage.getItem(localStorageKey) || '[]',
		);
		console.log('storedTodos => ', storedTodos);
		setTodos(storedTodos);
	}, []);

	const addTask = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: Task = {
			id: uuid(),
			task: state,
			created_at: Date.now(),
			completed: false,
		};

		setTodos((todo) => [data, ...todo]);
		const status = postTodos(data);

		if (status) {
			toast.success(`Added new task.`, {
				position: 'bottom-center',
			});
			setState('');
		}
	};

	const toggleComplete = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const removeTodo = ({ id, task }: Pick<Task, 'id' | 'task'>) => {
		setTodos(todos.filter((todo) => todo.id !== id));
		const data = deleteTodos(id);
		toast.success(`Deleted '${task}' Successfully`, {
			position: 'bottom-center',
		});
	};

	return (
		<div className={`flex flex-col justify-start items-center mt-20`}>
			<form
				onSubmit={addTask}
				className="flex flex-col space-y-10 md:space-y-0 md:flex-row items-center justify-between max-w-7xl w-full mx-auto"
			>
				<Input
					isClearable
					type="text"
					variant="bordered"
					placeholder="Enter task"
					value={state}
					onClear={() => setState('')}
					onChange={(e) => setState(e.target.value)}
					className="max-w-md w-full"
					classNames={{
						base: 'rounded-sm focus:border-white',
						input: '',
						inputWrapper:
							'rounded-lg py-2 border-transparent group-data-[focus=true]:border-white bg-zinc-900',
					}}
				/>
				<Select
					className="bg-foreground-900 max-w-md w-full"
					variant="bordered"
					size="sm"
					color={'default'}
					radius="sm"
					label="filter"
					classNames={{
						listboxWrapper:
							'bg-foreground-900 border border-foreground-500',
						listbox: 'hover:bg-foreground-800',
						value: 'hover:bg-foreground-800',
					}}
					defaultSelectedKeys={['All']}
				>
					{filters.map((filter) => (
						<SelectItem key={filter.value} value={filter.value}>
							{filter.name}
						</SelectItem>
					))}
				</Select>
				<input type="submit" className="hidden" />
			</form>

			<Tasks data={todos} error={''} deleteTodo={removeTodo} />

			<Toaster
				toastOptions={{
					success: {
						style: {
							background: '#294949',
							color: 'whitesmoke',
						},
					},
					error: {
						style: {
							background: 'red',
							color: 'whitesmoke',
						},
					},
				}}
			/>
		</div>
	);
}

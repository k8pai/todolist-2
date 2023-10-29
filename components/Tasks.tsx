'use client';

import { getTodos, putTodos } from '@/lib/client';
import { Filters, Task } from '@/typings';
import {
	Button,
	Card,
	CardBody,
	Checkbox,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdContentCopy, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

const TaskCard = ({ id, completed, created_at, task }: Task) => {
	const [selected, setSelected] = useState<boolean>(completed);

	useEffect(() => {
		putTodos({ id, completed: selected });
	}, [selected]);

	return (
		<Checkbox
			lineThrough={selected}
			isSelected={selected}
			color="success"
			className="text-white"
			radius="sm"
			classNames={{
				label: 'text-white ml-1',
			}}
			onValueChange={() => setSelected((current) => !current)}
		>
			{task}
		</Checkbox>
	);
};

const Tasks = ({
	data,
	error,
	filter,
	deleteTodo,
}: {
	data: Task[];
	error: string | unknown;
	filter: Filters;
	deleteTodo: ({ id, task }: Pick<Task, 'id' | 'task'>) => void;
}) => {
	if (error) {
		console.log('error occured while fetching => ', error);
	}
	console.log('filter => ', filter);

	let tasks = [],
		heading = 'Tasks';

	if (filter === 'all') {
		tasks = data;
	} else if (filter === 'completed') {
		heading = 'Completed Tasks';
		tasks = data.filter((task) => task.completed);
	} else {
		heading = 'To Be Done';
		tasks = data.filter((task) => !task.completed);
	}
	return (
		<div className="max-w-7xl w-full mx-auto mt-10">
			<h2 className="max-w-lg rounded-md text-xl font-semibold w-full mx-auto my-4">
				{heading}
			</h2>
			{tasks.map((task, _) => {
				return (
					<Card
						key={task.id}
						className="max-w-lg rounded-md bg-foreground-900 w-full mx-auto my-2"
					>
						<CardBody className="p-2 px-3 w-full flex flex-row items-center justify-between">
							<TaskCard {...task} />
							<MdDelete
								onClick={() =>
									deleteTodo({
										id: task.id,
										task: task.task,
									})
								}
								className={`fill-red-500`}
							/>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export default Tasks;

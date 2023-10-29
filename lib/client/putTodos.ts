import { Task } from '@/typings';
import { getTodos } from '.';
import { localStorageKey } from '../keys';

export const putTodos = ({ id, completed }: Pick<Task, 'id' | 'completed'>) => {
	// udpate tasks in the localstorage
	const { data: storeData, error } = getTodos();

	if (error) {
		return {
			status: 'Successfully Updated',
			error: 'No Such Task Exists!',
		};
	}

	const updatedData = storeData.map((task, _) => {
		if (id === task.id) {
			console.log(task);
			return { ...task, completed };
		}

		return task;
	});

	localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
	return { data: updatedData.find((task) => task.id === id), error: null };
};

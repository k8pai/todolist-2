import { Task } from '@/typings';
import { getTodos } from '.';
import { localStorageKey } from '../keys';

export const deleteTodos = async (id: Pick<Task, 'id'>) => {
	// delete tasks from the localstorage

	let { data: todos, error } = getTodos();

	todos = todos.filter((todo) => todo.id !== id);
	localStorage.setItem(localStorageKey, JSON.stringify(todos));
	return true;
};

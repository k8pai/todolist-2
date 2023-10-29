import { Task } from '@/typings';
import { localStorageKey } from '../keys';

export const getTodos = () => {
	// get tasks from the localstorage

	// const response = await fetch('/api/todos');
	// const data = await response.json();
	// return { data, error: null };

	const localStore = localStorage.getItem(localStorageKey) || '';

	let storeData: Task[];

	if (localStore) {
		try {
			storeData = JSON.parse(localStore);
			return { data: storeData, error: null };
		} catch (error) {
			storeData = [];
			console.error(error);
			return { data: [], error };
		}
	} else {
		return { data: [], error: null };
	}
};

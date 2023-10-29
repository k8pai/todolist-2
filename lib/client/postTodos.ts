import { Task } from '@/typings';
import { localStorageKey } from '../keys';

export const postTodos = (data: Task) => {
	// post tasks to the localstorage

	const localStore = localStorage.getItem(localStorageKey) || '';
	let storeData: Task[];

	if (localStore) {
		try {
			storeData = JSON.parse(localStore);
			storeData.push(data);
			localStorage.setItem(localStorageKey, JSON.stringify(storeData));
			return true;
		} catch (error) {
			console.error('Error parsing JSON:', error);
			storeData = [];
			return false;
		}
	} else {
		storeData = [];
		storeData.push(data);
		localStorage.setItem(localStorageKey, JSON.stringify(storeData));
		return true;
	}
};

import { V4Options } from 'uuid';

export type Task = {
	id: V4Options;
	task: string;
	created_at: number;
	completed: boolean;
};

export type Filters = 'all' | 'completed' | 'uncompleted';

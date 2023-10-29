import { getTodos, postTodos } from '@/lib/client';
import { localStorageKey } from '@/lib/keys';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		let { data, error } = getTodos();
		return NextResponse.json(
			{ data: data, error, status: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		console.log('error => ', error);
		return NextResponse.json({ error, status: 'failed' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();

		const res = postTodos(data);

		return Response.json({ data, status: 'success' });
	} catch (error) {
		return Response.json({ error, status: 'failed' });
	}
}

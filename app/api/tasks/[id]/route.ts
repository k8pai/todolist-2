import { deleteTodos, putTodos } from '@/lib/client';

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params;
	try {
		const data = await request.json();

		const res = putTodos({ id, completed: data.completed });

		return Response.json({ data: res, status: 'success' });
	} catch (error) {
		return Response.json({ error, status: 'failed' });
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params;
	try {
		const data = await request.json();

		const res = deleteTodos({ id });

		return Response.json({ data: res, status: 'success' });
	} catch (error) {
		return Response.json({ error, status: 'failed' });
	}
}

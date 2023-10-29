// pages/api/todos.js

export default function handler(req, res) {
	let todos = JSON.parse(localStorage.getItem('todos')) || [];

	switch (req.method) {
		case 'GET':
			res.status(200).json(todos);
			break;

		case 'POST':
			const newTodo = req.body;
			todos.push(newTodo);
			localStorage.setItem('todos', JSON.stringify(todos));
			res.status(201).json(newTodo);
			break;

		case 'PUT':
			const { id, completed } = req.body;
			todos = todos.map((todo) =>
				todo.id === id ? { ...todo, completed } : todo,
			);
			localStorage.setItem('todos', JSON.stringify(todos));
			res.status(200).json({ message: 'Todo updated successfully' });
			break;

		case 'DELETE':
			const deleteId = req.body.id;
			todos = todos.filter((todo) => todo.id !== deleteId);
			localStorage.setItem('todos', JSON.stringify(todos));
			res.status(200).json({ message: 'Todo deleted successfully' });
			break;

		default:
			res.status(405).json({ message: 'Method Not Allowed' });
	}
}

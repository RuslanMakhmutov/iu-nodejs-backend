import { Todos } from '../models/todos.js';

export class TodoController {
	static async getAllTodos(req, res) {
		const allTodos = await Todos.getAllTodos();

		res.status(200).send(allTodos);
	}

	static async createTodo(req, res) {
		try {
			const { title, description, tagId } = req.body;
			if (!title || !tagId) {
				res.status(400).send({ message: 'Не переданы обязательные поля' });
				return;
			}
			const row = await Todos.createTodo(title, tagId, description || null);
			res.status(200).send(row);
		} catch (e) {
			res.status(500).send(e.message);
		}
	}

	static async patchTodoById(req, res) {
		try {
			const { todoId } = req.params;

			const availableFields = ['title', 'description', 'tagId', 'completed_at']
			const sets = []
			Object.entries(req.body).map(([field, value]) => {
				if (availableFields.includes(field)) {
					sets.push(`${field}='${value}'`)
				}
			})

			if (!sets.length) {
				res.status(400).send({ message: 'Не переданы ни одного поля для обновления' });
				return;
			}

			const row = await Todos.patchTodoById(todoId, sets);
			res.status(200).send(row);
		} catch (e) {
			res.status(500).send(e.message);
		}}

	static async deleteTodoById(req, res) {
		try {
			const { todoId } = req.params;

			await Todos.deleteTodoById(todoId);
			res.status(200).end();
		} catch (e) {
			res.status(500).send(e.message);
		}
	}

	static async getTodoById(req, res) {
		try {
			const { todoId } = req.params;

			const row = await Todos.getTodoById(todoId);
			res.status(200).send(row);
		} catch (e) {
			res.status(500).send(e.message);
		}
	}
}

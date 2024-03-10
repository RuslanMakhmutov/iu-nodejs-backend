import { pool } from '../database/index.js';

export class Todos {
	static async getAllTodos() {
		const selectRes = await pool.query('select td.*, tg.title as tag_title from todos td join tags tg ON td.tag_id = tg.id ORDER BY td.id', []);

		return selectRes.rows;
	}

	static async getTodoById(id) {
		try {
			const searchRes = await pool.query('select * from todos where id = $1', [id]);
			if (searchRes.rowCount === 0) {
				throw new Error('Задание с таким id не существует');
			}
			return searchRes.rows[0];
		} catch (e) {
			throw new Error('Ошибка');
		}
	}

	static async createTodo(title, tagId, description = null) {
		try {
			const insertRes = await pool.query('insert into todos(title, description, tag_id, created_at) values($1, $2, $3, $4) RETURNING *', [
				title,
				description || null,
				tagId,
				new Date().toISOString(),
			]);
			return insertRes.rows[0]
		} catch (e) {
			throw new Error('Ошибка добавления');
		}
	}

	static async deleteTodoById(id) {
		try {
			const searchRes = await pool.query('select * from todos where id = $1', [id]);
			if (searchRes.rowCount === 0) {
				throw new Error('Задание с таким id не существует');
			}
			await pool.query('delete from todos where id = $1', [id]);
		} catch (e) {
			throw new Error(e.message || 'Ошибка удаления');
		}
	}

	static async patchTodoById(id, sets) {
		try {
			const searchRes = await pool.query('select * from todos where id = $1', [id]);
			if (searchRes.rowCount === 0) {
				throw new Error('Задание с таким id не существует');
			}
			const setString = sets.join(', ')
			const updateRes = await pool.query(`update todos SET ${setString} where id = $1 RETURNING *`, [id]);
			return updateRes.rows[0];
		} catch (e) {
			throw new Error(e.message || 'Ошибка удаления');
		}
	}
}

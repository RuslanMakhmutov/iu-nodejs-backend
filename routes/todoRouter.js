import { Router } from 'express';
import { TodoController } from '../controllers/todoController.js';

export const todoRouter = Router();

todoRouter.get('/', TodoController.getAllTodos);
todoRouter.get('/:todoId', TodoController.getTodoById);
todoRouter.post('/', TodoController.createTodo);
todoRouter.patch('/:todoId', TodoController.patchTodoById);
todoRouter.delete('/:todoId', TodoController.deleteTodoById);

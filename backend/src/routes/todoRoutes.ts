import { Router } from 'express';
import { getTodos, createTodo, deleteTodo } from '../controllers/todoController';

const router = Router();

/**
 * @route   GET /api/todos
 * @desc    Fetch all todos
 * @access  Public
 */
router.get('/', getTodos);

/**
 * @route   POST /api/todos
 * @desc    Create a new todo
 * @access  Public
 */
router.post('/', createTodo);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Delete a todo by ID
 * @access  Public
 */
router.delete('/:id', deleteTodo);

export default router;
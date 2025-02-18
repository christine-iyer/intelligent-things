import { Router } from 'express';
import { getTaskDescription, getTaskSchedule, getSubtasks } from '../controllers/openaiController';

const router = Router();

/**
 * @route   POST /api/ai/description
 * @desc    Generate a task description
 * @access  Public
 */
router.post('/description', getTaskDescription);

/**
 * @route   POST /api/ai/schedule
 * @desc    Generate a schedule based on tasks and available time
 * @access  Public
 */
router.post('/schedule', getTaskSchedule);

/**
 * @route   POST /api/ai/subtasks
 * @desc    Generate subtasks for a main task
 * @access  Public
 */
router.post('/subtasks', getSubtasks);

export default router;
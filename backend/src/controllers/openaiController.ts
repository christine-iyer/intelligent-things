import { Request, Response } from 'express';
import { generateTaskDescription, generateTaskSchedule, suggestSubtasks } from '../services/openaiService';

// @desc    Generate a task description using OpenAI
// @route   POST /api/ai/description
export const getTaskDescription = async (req: Request, res: Response) => {
  const { task } = req.body;

  if (!task) return res.status(400).json({ message: 'Task is required' });

  try {
    const description = await generateTaskDescription(task);
    res.status(200).json({ description });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate task description' });
  }
};

// @desc    Generate a task schedule using OpenAI
// @route   POST /api/ai/schedule
export const getTaskSchedule = async (req: Request, res: Response) => {
  const { tasks, totalTime } = req.body;

  if (!tasks || !totalTime) return res.status(400).json({ message: 'Tasks and totalTime are required' });

  try {
    const schedule = await generateTaskSchedule(tasks, totalTime);
    res.status(200).json({ schedule });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate task schedule' });
  }
};

// @desc    Suggest subtasks for a main task using OpenAI
// @route   POST /api/ai/subtasks
export const getSubtasks = async (req: Request, res: Response) => {
  const { task } = req.body;

  if (!task) return res.status(400).json({ message: 'Task is required' });

  try {
    const subtasks = await suggestSubtasks(task);
    res.status(200).json({ subtasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate subtasks' });
  }
};
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI API with the API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * @desc Generates a description for a given task
 * @param task The task for which a description is needed
 * @returns A string containing the task description
 */
export const generateTaskDescription = async (task: string): Promise<string> => {
  const prompt = `Write a brief and concise description for the following task: "${task}"`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 50,
    temperature: 0.7,
  });

  return response.data.choices[0]?.text?.trim() || 'No description generated.';
};

/**
 * @desc Generates a task schedule based on tasks and available time
 * @param tasks An array of tasks
 * @param totalTime The total time (in hours) available to complete the tasks
 * @returns A string containing the suggested task schedule
 */
export const generateTaskSchedule = async (tasks: string[], totalTime: number): Promise<string> => {
  const taskList = tasks.join(', ');
  const prompt = `Given the following tasks: ${taskList}, and ${totalTime} hours available, create a simple and efficient schedule.`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.data.choices[0]?.text?.trim() || 'No schedule generated.';
};

/**
 * @desc Generates a list of subtasks for a given main task
 * @param task The main task that needs to be broken into subtasks
 * @returns An array of strings containing suggested subtasks
 */
export const suggestSubtasks = async (task: string): Promise<string[]> => {
  const prompt = `List 3 subtasks to complete the following main task: "${task}"`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
    temperature: 0.7,
  });

  const suggestions = response.data.choices[0]?.text?.trim().split('\n') || [];
  return suggestions.map((subtask) => subtask.replace(/^\d+\.\s/, '').trim());
};
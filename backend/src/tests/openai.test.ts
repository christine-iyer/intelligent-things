import request from 'supertest';
import app from '../app';
import dotenv from 'dotenv';

dotenv.config();

describe('OpenAI API Endpoints', () => {
  // Test POST /api/ai/description
  it('should generate a task description', async () => {
    const res = await request(app)
      .post('/api/ai/description')
      .send({ task: 'Clean the kitchen' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.description).toBeDefined();
    expect(typeof res.body.description).toBe('string');
  });

  // Test POST /api/ai/schedule
  it('should generate a task schedule', async () => {
    const res = await request(app)
      .post('/api/ai/schedule')
      .send({ tasks: ['Clean the kitchen', 'Read a book'], totalTime: 2 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.schedule).toBeDefined();
    expect(typeof res.body.schedule).toBe('string');
  });

  // Test POST /api/ai/subtasks
  it('should generate subtasks for a main task', async () => {
    const res = await request(app)
      .post('/api/ai/subtasks')
      .send({ task: 'Prepare for a presentation' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.subtasks).toBeDefined();
    expect(Array.isArray(res.body.subtasks)).toBe(true);
    expect(res.body.subtasks.length).toBeGreaterThan(0);
  });

  // Test Error: Missing Input
  it('should return a 400 error if task is missing', async () => {
    const res = await request(app).post('/api/ai/description').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Task is required');
  });
});
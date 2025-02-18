import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import Todo from '../models/Todo';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(process.env.MONGO_URI!);
});

afterAll(async () => {
  // Clean up the test database and close the connection
  await Todo.deleteMany();
  await mongoose.connection.close();
});

describe('Todo API Endpoints', () => {
  let todoId: string;

  // Test GET /api/todos
  it('should fetch all todos (initially empty)', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  // Test POST /api/todos
  it('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo Item' };
    const res = await request(app).post('/api/todos').send(newTodo);

    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe(newTodo.title);
    expect(res.body.completed).toBe(false);

    todoId = res.body._id; // Save the ID for future tests
  });

  // Test GET /api/todos after adding a todo
  it('should fetch all todos (contains one item)', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Test Todo Item');
  });

  // Test DELETE /api/todos/:id
  it('should delete a todo by ID', async () => {
    const res = await request(app).delete(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Todo deleted successfully');
  });

  it('should fetch all todos (should now be empty)', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });
});
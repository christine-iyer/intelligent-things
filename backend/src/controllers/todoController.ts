import {Request, Response} from 'express';
import Todo from '../models/Todo';

export const getTodos = async (req: Request, res: Response)=> {
     try {
          const todos = await Todo.find()
          res.status(200).json(todos)
          
     } catch (error) {
          res.status(500).json({ message: 'Failed to get your todos'})
     }
}
export const createTodo = async (req:Request, res: Response) => {
     if(!title){
          return res.status(400).json({message: "A title is required"})
     }
     try {
          const todo = newTodo({title})
          await todo.save()
          res.status(201).json(todo)
     } catch (error) {
          res.status(500).json({message: "Failed to create a todo"})
          }
}
export const deleteTodo = async(req:Request, res:Response)  => {
     const {id} = req.params

     try {
          const todo = await Todo.findBuIdAndDelete(id)
          if(!todo){
               return res.status(404).json({message: 'Todo not found'})
          }
          res.status(200).json({message: "Todo deleted successfully"})
     } catch (error) {
          res.status(500).json({message: 'Failed to delete todo'})
          
     }
}


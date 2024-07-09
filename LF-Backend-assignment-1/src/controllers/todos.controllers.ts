import e, { Request, Response } from "express";
import * as TodoService from "../services/todos.service";
import { Todo } from "../interfaces/todos.interface";

const createTodos = (req: Request, res: Response) => {
  const { title, completed } = req.body;

  const currentDate = new Date();

  const newTodo: Todo = {
    title,
    completed,
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  const createdTodos = TodoService.createTodos(newTodo);
  res.status(201).json({ message: "todos created" });
};

const getTodos = (req: Request, res: Response) => {
  const todos = TodoService.getTodos();
  res.status(200).json(todos);
};

const getTodoById = (req: Request, res: Response) => {
  const todoId = req.params.id;

  const todo = TodoService.getTodoById(todoId.toString());

  res.status(200).json({ message: todo });
};

const deleteTodo = (req: Request, res: Response) => {
  const todoId = req.params.id;
  const isDeleted = TodoService.deleteTodoById(todoId);
  if (!isDeleted) {
    return res.status(404).json({ message: "deletion failed" });
  }
  res.status(200).json({ message: "todo deletion successful" });
};

const updateTodo = (req: Request, res: Response) => {
  const todoId = req.params.id;
  let { title, completed } = req.body;

  const isUpdated = TodoService.updateTodoById(todoId, title, completed);

  if (!isUpdated) {
    return {
      error: "updation failed",
    };
  }

  res.status(200).json({ message: "todo updated successfully" });
};
export { createTodos, getTodos, getTodoById, deleteTodo, updateTodo };

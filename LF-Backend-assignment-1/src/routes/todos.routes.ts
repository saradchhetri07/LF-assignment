import express from "express";
import {
  createTodos,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodos);
router.get("/:id", getTodoById);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;

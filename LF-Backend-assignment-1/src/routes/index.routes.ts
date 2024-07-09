import express from "express";
import todosRouter from "../routes/todos.routes";

const router = express.Router();

router.use("/todos", todosRouter);

export default router;

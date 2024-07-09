import { Todo } from "../interfaces/todos.interface";

let todos = [
  {
    id: "1",
    title: "Learn Node.js",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * Retrieves the list of all todos.
 * @returns {Todo[]} Array of todos.
 */
const getTodos = (): Todo[] => {
  return todos;
};

/**
 * Creates a new todo and adds it to the list.
 * @param {Todo} todo - The todo to be added.
 * @returns {Todo[]} Updated array of todos.
 */
const createTodos = (todo: Todo): Todo[] => {
  let todosLength = todos.length;

  todos.push({ id: `${todosLength + 1}`, ...todo });

  return todos;
};

/**
 * Retrieves a todo by its ID.
 * @param {string} id - The ID of the todo to retrieve.
 * @returns {Todo | undefined} The todo with the given ID, or undefined if not found.
 */
const getTodoById = (id: string): Todo | undefined => {
  return todos.find(({ id: todoId }) => id === todoId);
};

/**
 * Deletes a todo by its ID.
 * @param {string} id - The ID of the todo to delete.
 * @returns {boolean} True if the todo was deleted, false otherwise.
 */
const deleteTodoById = (id: string): boolean => {
  const initialLength = todos.length;
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;

  return initialLength !== newTodos.length;
};

/**
 * Updates a todo by its ID.
 * @param {string} id - The ID of the todo to update.
 * @param {string | undefined} newtitle - The new title for the todo, or undefined to keep the current title.
 * @param {boolean | undefined} newcompleted - The new completed status for the todo, or undefined to keep the current status.
 * @returns {boolean} True if the todo was updated, false otherwise.
 */
const updateTodoById = (
  id: string,
  newtitle: string | undefined,
  newcompleted: boolean | undefined
): boolean => {
  let isChanged: boolean = false;
  todos = todos.map((todo) => {
    if (todo.id === id) {
      isChanged = true;
      return {
        ...todo, //spread the current todo properties
        title: newtitle !== undefined ? newtitle : todo.title, // Update title if provided
        completed: newcompleted !== undefined ? newcompleted : todo.completed, // Update completed if provided
        updatedAt:
          newtitle !== undefined && newcompleted !== undefined
            ? new Date()
            : todo.updatedAt,
      };
    }
    return todo;
  });
  return isChanged;
};

export { getTodos, createTodos, getTodoById, deleteTodoById, updateTodoById };

import './sass/styles.scss';
import { createTodoHtml } from "./utils/components";
import { TodoList } from "./utils/TodoList";

export const todoList = new TodoList();
todoList.todos.forEach( createTodoHtml );


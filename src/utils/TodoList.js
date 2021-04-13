import { Todo } from "./Todo";

export class TodoList {
  constructor() {
    this.loadsTodos();
  }

  newTodo(todo) {
    this.todos.push(todo);
    this.saveTodos();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id != id);
    this.saveTodos();
  }

  markComplete(id) {
    for(const todo of this.todos) {
      if(todo.id == id) {
        todo.complete = !todo.complete;
        this.saveTodos();
        break;
      }
    }
  }

  saveTodos() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }

  loadsTodos() {
    this.todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
    this.todos = this.todos.map(Todo.fromJson);
  }
}

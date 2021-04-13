import { todoList } from "../index";
import { Todo } from "./Todo";


const todoInput = document.getElementById('todoInput');
const todoListHtml = document.getElementById('todo-list');
const fragment = document.createDocumentFragment();

export const createTodoHtml = todo => {
  if(!todo) return;
  const htmlTodo = `
    <div class="task">
      <input type="checkbox" id="${todo.id}" data-btn="status" ${(todo.complete) ? 'checked' : ''}>
      <label for="${todo.id}" class="${(todo.complete) ? 'completed' : ''}">${todo.task}</label>
    </div>
    <a href="#" id="deleteTodo" class="deleteTodo" data-id="${todo.id}">
      <svg class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f45d01" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </a>
  `;
  
  const li = document.createElement('li');
  li.innerHTML = htmlTodo;

  fragment.append(li);
  todoListHtml.appendChild(fragment);
};

todoInput.addEventListener('keyup', e => {

  if(e.key === 'Enter' && e.target.value.length > 0) {
    const newTask = new Todo(e.target.value);
    todoList.newTodo(newTask);

    createTodoHtml(newTask);
    e.target.value = '';
    e.target.focus();
  }

});

document.addEventListener('click', e => {


  if(e.target.matches('input[type="checkbox"]')) { // Mark as completed
    todoList.markComplete(e.target.id);
    e.target.nextElementSibling.classList.toggle('completed');
  
  }

  if(e.target.parentElement.localName.includes('a')) {
    todoList.deleteTodo(e.target.parentElement.dataset.id);
    todoListHtml.removeChild(e.target.parentElement.parentElement);
  }

});




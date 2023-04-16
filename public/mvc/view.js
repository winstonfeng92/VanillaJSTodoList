export const View = (() => {
  const todolistEl = document.querySelector('.todo-list');
  const listContainerEl = document.querySelector('.list_container');
  const submitBtnEl = document.querySelector('.submit-btn');
  const inputEl = document.querySelector('.input');

  const renderTodos = (todos) => {
    let todosTemplate = '';
    let completedTodosTemplate = '';
    console.log(todos);
    todos.forEach((todo) => {
      const liTemplate = `<li>
      <span>${todo.content}</span>

      <button class="edit-btn" id="${todo.id}"><i class='fa fa-pencil'></i> </button>
      <button class="delete-btn" id="${todo.id}"><i class="fa fa-trash"></i></button>
      <button class="complete-btn" id="${todo.id}"><i class="fa fa-arrow-right"></i></button>
      </li>`;
      const liCompleteTemplate = `<li>
      <button class="complete-btn" id="${todo.id}"><i class="fa fa-arrow-left"></i></button>
      <span>${todo.content}</span>
      <button class="edit-btn" id="${todo.id}"><i class='fa fa-pencil'></i> </button>
      <button class="delete-btn" id="${todo.id}"><i class="fa fa-trash"></i></button>
  
      </li>`;
      if (todo.complete) {
        completedTodosTemplate += liCompleteTemplate;
      } else {
        todosTemplate += liTemplate;
      }
    });
    if (todos.length === 0) {
      todosTemplate = '<h4>no task to display!</h4>';
    }
    todolistEl.innerHTML = todosTemplate;
    document.querySelector('.todo-list.completed').innerHTML =
      completedTodosTemplate;
  };

  const clearInput = () => {
    inputEl.value = '';
  };

  return {
    renderTodos,
    submitBtnEl,
    inputEl,
    clearInput,
    todolistEl,
    listContainerEl,
  };
})();

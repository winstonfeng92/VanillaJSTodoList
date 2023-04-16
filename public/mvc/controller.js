import { Model } from './model.js';
import { View } from './view.js';

export const Controller = ((view, model) => {
  const state = new model.State();
  const init = () => {
    model.getTodos().then((todos) => {
      todos.reverse();
      state.todos = todos;
    });
  };

  const handleSubmit = () => {
    view.submitBtnEl.addEventListener('click', (event) => {
      /* 
                1. read the value from input
                2. post request
                3. update view
            */
      const inputValue = view.inputEl.value;
      model
        .createTodo({
          content: inputValue,
          complete: false,
        })
        .then((data) => {
          state.todos = [data, ...state.todos];
          view.clearInput();
        });
    });
  };

  const handleDelete = () => {
    //event bubbling
    /* 
            1. get id
            2. make delete request
            3. update view, remove
        */
    view.listContainerEl.addEventListener('click', (event) => {
      if (event.target.className === 'delete-btn') {
        const id = event.target.id;
        console.log('id', typeof id);
        model.deleteTodo(+id).then((data) => {
          state.todos = state.todos.filter((todo) => todo.id !== +id);
        });
      }
    });
  };

  const handleEdit = () => {
    view.listContainerEl.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-btn')) {
        const id = event.target.id;
        const target = event.target;
        console.log('id edit', id);
        const span = target.parentNode.querySelector('span');

        span.contentEditable =
          span.contentEditable === 'true' ? 'false' : 'true';
        span.focus();
        let textData = {
          content: span.innerText,
        };

        if (span.contentEditable === 'false') {
          console.log('updating ');
          console.log(typeof id + 'id: ' + id);
          console.log(state.getTodoById(id));
          const todo = state.getTodoById(Number(id));
          textData.complete = todo.complete;
          model.editTodo(textData, id);
        }
      }
    });
  };

  const completeTodo = () => {
    view.listContainerEl.addEventListener('click', (event) => {
      if (event.target.classList.contains('complete-btn')) {
        const id = parseInt(event.target.id);
        state.toggleTodoComplete(id);
      }
    });
  };

  const bootstrap = () => {
    init();
    handleSubmit();
    handleDelete();
    handleEdit();
    completeTodo();
    state.subscribe(() => {
      view.renderTodos(state.todos);
    });
  };
  return {
    bootstrap,
  };
})(View, Model); //ViewModel

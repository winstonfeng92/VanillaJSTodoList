//import { myFetch } from '/myFetch.js';
import { myFetch } from './myFetch.js';

export const APIs = (() => {
  const createTodo = (newTodo) => {
    console.log(newTodo);
    return myFetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  };

  const deleteTodo = (id) => {
    return myFetch('http://localhost:3000/todos/' + id, {
      method: 'DELETE',
    }).then((res) => res.json());
  };

  const getTodos = () => {
    return myFetch('http://localhost:3000/todos').then((res) => res.json());
  };

  const editTodo = (data, id) => {
    console.log(data);
    return myFetch('http://localhost:3000/todos/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  return {
    createTodo,
    deleteTodo,
    getTodos,
    editTodo,
  };
})();

import React, { useState, useEffect } from 'react';
import './StyleTodo.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Hide' : 'Show'} Tasks
      </button>
      <ul>
        {showAll &&
          todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.title}
              </span>
              <button onClick={() => editTodo(todo.id, prompt('Edit task:', todo.title))}>
                Edit
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TodoApp;
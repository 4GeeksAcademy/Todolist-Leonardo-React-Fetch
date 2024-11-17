import React, { useEffect, useState } from "react";
import Campo from "./Campo";

const Home = () => {
  const [isListCreated, setIsListCreated] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Obtener la lista al inicio
    fetch("https://playground.4geeks.com/Leonardo4Geeks/")
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => {
        setTodos(data.todos || []);
        setIsListCreated(true);
      })
      .catch(() => setIsListCreated(false));
  }, []);

  // Función para agregar tarea
  const addTodo = (newTodo) => {
    fetch("https://playground.4geeks.com/todo/todos/Leonardo4Geeks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(data => {
        setTodos((prevTodos) => [...prevTodos, data]);
        alert("Tarea agregada exitosamente");
      })
      .catch(() => alert("Error al agregar la tarea"));
  };

  // Función para eliminar una tarea
  const deleteTodo = (todoId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
        alert("Tarea eliminada");
      })
      .catch(() => alert("Error al eliminar la tarea"));
  };

  // Función para eliminar todas las tareas
  const clearAllTodos = () => {
    const deleteRequests = todos.map(todo =>
      fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
        method: "DELETE",
      })
    );

    Promise.all(deleteRequests)
      .then(() => {
        setTodos([]); // Limpiar la lista local después de eliminar todas las tareas
        alert("Todas las tareas fueron eliminadas");
      })
      .catch(() => alert("Error al eliminar todas las tareas"));
  };

  return (
    <div className="container">
      {isListCreated ? (
        <div className="todo-list">
          <h1>Lista de Tareas</h1>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo.label}
                <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <Campo onAddTodo={addTodo} isListCreated={isListCreated} />
          <button className="clear-all-btn" onClick={clearAllTodos}>Eliminar todas las tareas</button>
        </div>
      ) : (
        <div className="todo-list">
          <Campo
            onListCreated={(newTodos) => {
              setTodos(newTodos);
              setIsListCreated(true);
            }}
            isListCreated={isListCreated}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

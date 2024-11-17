import React, { useState } from "react";

const Campo = ({ onListCreated, onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  // Función para crear o sincronizar la lista
  const createOrSyncList = () => {
    fetch("https://playground.4geeks.com/todo/users/Leonardo4Geeks/")
      .then(response => {
        if (response.ok) return response.json();
        return fetch("https://playground.4geeks.com/todo/users/Leonardo4Geeks/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Leonardo4Geeks", todos: [] })
        }).then(res => res.json());
      })
      .then(data => {
        onListCreated(data.todos || []);
        alert("Lista sincronizada o creada");
      })
      .catch(() => alert("Error al sincronizar o crear la lista"));
  };

  // Función para agregar una tarea
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo = { label: inputValue, is_done: false };
      onAddTodo(newTodo);
      setInputValue(""); // Limpiar el campo de entrada
    } else {
      alert("Por favor ingresa una tarea.");
    }
  };

  return (
    <div>
      <button onClick={createOrSyncList} className="btn btn-primary">
        Sincronizar o Crear Lista
      </button>
      <div className="input-group mt-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control"
          placeholder="Nueva tarea"
        />
        <button onClick={handleAddTodo} className="btn btn-success">
          Agregar Tarea
        </button>
      </div>
    </div>
  );
};

export default Campo;

import React, { useState } from "react";

const Campo = ({ onListCreated, onAddTodo, isListCreated }) => {
  const [inputValue, setInputValue] = useState(""); // Estado para el valor del input

  const createOrSyncList = () => {
    // Sincronizar o crear lista
    fetch("https://playground.4geeks.com/todo/users/Leonardo4Geeks/")
      .then(response => {
        if (response.ok) return response.json(); // Si la lista existe, la sincroniza
        return fetch("https://playground.4geeks.com/todo/users/Leonardo4Geeks/", {
          method: "POST", // Si no existe, crea la lista
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Leonardo4Geeks", todos: [] }) // Crea una lista vacía
        }).then(res => res.json());
      })
      .then(data => {
        onListCreated(data.todos || []);
        alert("Lista sincronizada o creada");
      })
      .catch(() => alert("Error al sincronizar o crear la lista"));
  };

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo = { label: inputValue, is_done: false };
      onAddTodo(newTodo);
      setInputValue("");
    } else {
      alert("Por favor ingresa una tarea.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      {!isListCreated ? (
        <div className="d-flex justify-content-center">
          <button onClick={createOrSyncList} className="btn btn-info">
            Sincronizar o Crear Lista
          </button>
        </div>
      ) : (
        <div className="d-flex">
          <input
            type="text"
            value={inputValue}
            maxLength={32}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nueva tarea"
            className="form-control mr-2"
          />
          <button onClick={handleAddTodo} className="btn btn-primary">Agregar Tarea</button>
        </div>
      )}
    </div>
  );
};

export default Campo;

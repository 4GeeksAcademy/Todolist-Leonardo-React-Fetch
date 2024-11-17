import React, { useState } from "react";

const Campo = ({ onListCreated, onAddTodo, isListCreated }) => {
  const [inputValue, setInputValue] = useState(""); // Estado para el valor del input

  const createOrSyncList = () => {
    // Realiza una petición para sincronizar o crear la lista
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
        onListCreated(data.todos || []); // Devuelve las tareas y cambia el estado de la lista creada
        alert("Lista sincronizada o creada");
      })
      .catch(() => alert("Error al sincronizar o crear la lista")); // Manejo de errores
  };

  const handleAddTodo = () => {
    if (inputValue.trim()) { // Si el input no está vacío
      const newTodo = { label: inputValue, is_done: false }; // Se crea una nueva tarea
      onAddTodo(newTodo); // Se agrega la tarea mediante la función pasada como prop
      setInputValue(""); // Limpiar el campo de entrada
    } else {
      alert("Por favor ingresa una tarea."); // Si el input está vacío, muestra un mensaje
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      {!isListCreated ? ( // Mostrar el botón de sincronizar solo si la lista no está creada
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
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress} // Detecta la tecla Enter
            placeholder="Nueva tarea"
            className="form-control mr-2" // Asegura que el input tenga un estilo adecuado
          />
          <button onClick={handleAddTodo} className="btn btn-primary">Agregar Tarea</button>
        </div>
      )}
    </div>
  );
};

export default Campo;

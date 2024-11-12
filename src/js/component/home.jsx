import React, { useState, useEffect } from "react";
import Campo from "./Campo";

const API_URL = "https://playground.4geeks.com/todo/user/alesanchezr";

const Home = () => {
	const [tareas, setTareas] = useState([]); // Estado para almacenar las tareas
	const [nuevaTarea, setNuevaTarea] = useState(""); // Estado para la tarea que se va a agregar

	// useEffect para obtener las tareas al cargar la app
	useEffect(() => {
		const obtenerTareas = async () => {
			try {
				const respuesta = await fetch(API_URL);
				if (!respuesta.ok) throw new Error("Error al obtener las tareas");
				const datos = await respuesta.json();
				setTareas(datos); // Establece las tareas obtenidas en el estado
			} catch (error) {
				console.error("Error en la obtención:", error);
			}
		};
		obtenerTareas();
	}, []);

	// Función para actualizar las tareas en el servidor
	const actualizarTareasEnServidor = (nuevaLista) => {
		fetch(API_URL, {
			method: "PUT",
			body: JSON.stringify(nuevaLista),
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(resp => {
			console.log(resp.ok); // Será true si la respuesta es exitosa
			console.log(resp.status); // Código de estado de la respuesta
			return resp.json();
		})
		.then(data => {
			console.log(data); // Imprime el objeto recibido del servidor
			setTareas(nuevaLista); // Actualiza el estado con la nueva lista de tareas
		})
		.catch(error => {
			console.error("Error al sincronizar las tareas:", error);
		});
	};

	// Agregar una nueva tarea
	const handleKeyPress = (event) => {
		if (event.key === "Enter" && nuevaTarea.trim()) {
			const nuevaLista = [...tareas, { label: nuevaTarea.trim(), done: false }];
			actualizarTareasEnServidor(nuevaLista);
			setNuevaTarea("");
		}
	};

	// Eliminar una tarea específica
	const eliminarTarea = (index) => {
		const nuevaLista = tareas.filter((_, i) => i !== index);
		actualizarTareasEnServidor(nuevaLista);
	};

	// Limpiar todas las tareas
	const limpiarTareas = () => {
		actualizarTareasEnServidor([]);
	};

	return (
		<div className="container mt-5">
			<h1 id="Titulo" className="text-center">Lista de Tareas de Leo</h1>
			{/* Input para añadir tareas */}
			<input
				id="Field"
				type="text"
				className="form-control mb-3"
				placeholder="Añadir una tarea..."
				value={nuevaTarea}
				onChange={(e) => setNuevaTarea(e.target.value)}
				onKeyPress={handleKeyPress}
			/>
			{/* Lista de tareas */}
			<div id="Lista">
				{tareas.length === 0 ? (
					<p>No hay tareas, añadir tareas</p>
				) : (
					tareas.map((tarea, index) => (
						<Campo key={index} tarea={tarea.label} eliminar={() => eliminarTarea(index)} />
					))
				)}
			</div>
			{/* Botón para limpiar todas las tareas */}
			<button className="btn btn-danger mt-3" onClick={limpiarTareas}>Limpiar Todas las Tareas</button>
		</div>
	);
};

export default Home;

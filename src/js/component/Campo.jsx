import React from "react";

const Campo = ({ tarea, eliminar }) => {
	return (
		<div className="tarea-container d-flex justify-content-between align-items-center border-bottom py-2">
			<span>{tarea}</span> {/* Muestra el texto de la tarea */}
			<button className="btn btn-sm btn-danger eliminar-btn" onClick={eliminar}>
				<i className="fa fa-trash" aria-hidden="true"></i> {/* Icono de eliminar */}
			</button> {/* Botón para eliminar la tarea */}
		</div>
	);
};

export default Campo;
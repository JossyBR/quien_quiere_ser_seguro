import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

const DeletePreguntas = ({ Id }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.delete(`/admin/preguntas/${Id}`, {
            onError: () => {
                // Manejo de errores, por si acaso
                alert("Hubo un error al eliminar la pregunta");
            },
        });
    };

    return (
        <div>
            <h1>Eliminar pregunta</h1>
            <Link href="/admin/preguntas">Regresar preguntas</Link>
            <form onSubmit={handleSubmit}>
                <p>Esta seguro que desea eliminar esta pregunta</p>
                <div>
                    <button type="submit">Eliminar</button>
                </div>
            </form>
        </div>
    );
};

export default DeletePreguntas;

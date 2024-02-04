import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

const AdminPreguntas = ({ preguntas }) => {
    // const eliminarPregunta = (id) => {
    //     // Código para eliminar pregunta
    //     Inertia.delete(`/admin/preguntas/${id}`);
    // };

    return (
        <div>
            <h2>Administrar Preguntas</h2>

            <div>
                <Link href="/juego"> Regresar al juego</Link>
            </div>
            <div>
                <Link href="/crear-pregunta">Crear Preguntas</Link>
            </div>

            {preguntas.map((pregunta) => (
                <div key={pregunta.id}>
                    {pregunta.pregunta}
                    <button
                        onClick={() =>
                            Inertia.visit(
                                `/admin/preguntas/editar/${pregunta.id}`
                            )
                        }
                    >
                        Editar
                    </button>
                    <button
                        onClick={() =>
                            Inertia.visit(
                                `/admin/preguntas/delete/${pregunta.id}`,
                                { method: "get" }
                            )
                        }
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdminPreguntas;

import React from "react";
import { Link } from "@inertiajs/inertia-react";

const CrearPreguntas = () => {
    return (
        <div>
            <form action="">
                <div>
                    <div>
                        <Link href="/juego">Regresar</Link>
                    </div>
                    <label for="pregunta">Escribe una pregunta</label>
                    <input type="text" id="pregunta" name="pregunta" required />
                </div>

                <div>
                    <label for="respuesta1">Respuesta 1</label>
                    <input
                        type="text"
                        id="respuesta1"
                        name="respuesta1"
                        required
                    />
                    /{" "}
                </div>
                <div>
                    <label for="respuesta2">Respuesta 2</label>
                    <input
                        type="text"
                        id="respuesta2"
                        name="respuesta2"
                        required
                    />
                </div>
                <div>
                    <label for="respuesta3">Respuesta 3</label>
                    <input
                        type="text"
                        id="respuesta3"
                        name="respuesta3"
                        required
                    />
                </div>
                <div>
                    <label for="respuesta4">Respuesta 4</label>
                    <input
                        type="text"
                        id="respuesta4"
                        name="respuesta4"
                        required
                    />
                </div>
                <div>
                    <label for="respuesta_correcta">
                        Escribe la respuesta correcta
                    </label>
                    <input
                        type="text"
                        id="respuesta_correcta"
                        name="respuesta_correcta"
                        required
                    />
                </div>

                <button type="submit">Crear pregunta</button>
            </form>
        </div>
    );
};

export default CrearPreguntas;

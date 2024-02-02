import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const CrearPreguntas = () => {
    const [form, setForm] = useState({
        pregunta: "",
        respuesta1: "",
        respuesta2: "",
        respuesta3: "",
        respuesta4: "",
        respuesta_correcta: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/pregunta", form);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Link href="/juego">Regresar</Link>
                    </div>
                    <label htmlFor="pregunta">Escribe una pregunta</label>
                    <input type="text" id="pregunta" name="pregunta" required />
                </div>

                <div>
                    <label htmlFor="respuesta1">Respuesta 1</label>
                    <input
                        type="text"
                        id="respuesta1"
                        name="respuesta1"
                        required
                    />
                    /{" "}
                </div>
                <div>
                    <label htmlFor="respuesta2">Respuesta 2</label>
                    <input
                        type="text"
                        id="respuesta2"
                        name="respuesta2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="respuesta3">Respuesta 3</label>
                    <input
                        type="text"
                        id="respuesta3"
                        name="respuesta3"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="respuesta4">Respuesta 4</label>
                    <input
                        type="text"
                        id="respuesta4"
                        name="respuesta4"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="respuesta_correcta">
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

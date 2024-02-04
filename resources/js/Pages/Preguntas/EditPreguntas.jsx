import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

const EditPreguntas = ({ preguntaActual }) => {
    const [pregunta, setPregunta] = useState("");
    const [respuesta1, setRespuesta1] = useState("");
    const [respuesta2, setRespuesta2] = useState("");
    const [respuesta3, setRespuesta3] = useState("");
    const [respuesta4, setRespuesta4] = useState("");
    const [respuestaCorrecta, setRespuestaCorrecta] = useState("");

    useEffect(() => {
        if (preguntaActual) {
            setPregunta(preguntaActual.pregunta || "");
            setRespuesta1(preguntaActual.respuesta1 || "");
            setRespuesta2(preguntaActual.respuesta2 || "");
            setRespuesta3(preguntaActual.respuesta3 || "");
            setRespuesta4(preguntaActual.respuesta4 || "");
            setRespuestaCorrecta(preguntaActual.respuesta_correcta || "");
        }
    }, [preguntaActual]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm({ ...form, [name]: value });
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construye el objeto form con los estados actuales
        const form = {
            pregunta,
            respuesta1,
            respuesta2,
            respuesta3,
            respuesta4,
            respuesta_correcta: respuestaCorrecta,
        };

        //preguntaActual.id para el id de la pregunta
        Inertia.post(`/admin/preguntas/editar/${preguntaActual.id}`, form);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Link href="/admin/preguntas">Regresar</Link>
                    </div>
                    <h1>Formulario de edición</h1>
                    <label htmlFor="pregunta">Pregunta</label>
                    <input
                        type="text"
                        id="pregunta"
                        name="pregunta"
                        value={pregunta}
                        onChange={(e) => setPregunta(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="respuesta1">Respuesta 1</label>
                    <input
                        type="text"
                        id="respuesta1"
                        name="respuesta1"
                        value={respuesta1}
                        onChange={(e) => setRespuesta1(e.target.value)}
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
                        value={respuesta2}
                        onChange={(e) => setRespuesta2(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="respuesta3">Respuesta 3</label>
                    <input
                        type="text"
                        id="respuesta3"
                        name="respuesta3"
                        value={respuesta3}
                        onChange={(e) => setRespuesta3(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="respuesta4">Respuesta 4</label>
                    <input
                        type="text"
                        id="respuesta4"
                        name="respuesta4"
                        value={respuesta4}
                        onChange={(e) => setRespuesta4(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="respuesta_correcta">
                        Escoge la respuesta correcta
                    </label>
                    <select
                        name="respuesta_correcta"
                        id="respuesta_correcta"
                        value={respuestaCorrecta}
                        onChange={(e) => setRespuestaCorrecta(e.target.value)}
                        required
                    >
                        <option value={respuesta1}>
                            {preguntaActual.respuesta1}
                        </option>
                        <option value={respuesta2}>
                            {preguntaActual.respuesta2}
                        </option>
                        <option value={respuesta3}>
                            {preguntaActual.respuesta3}
                        </option>
                        <option value={respuesta4}>
                            {preguntaActual.respuesta4}
                        </option>
                    </select>
                    {/* <input
                        type="text"
                        id="respuesta_correcta"
                        name="respuesta_correcta"
                        value={respuestaCorrecta}
                        onChange={(e) => setRespuestaCorrecta(e.target.value)}
                        required
                    /> */}
                </div>

                <button type="submit">Editar pregunta</button>
            </form>
        </div>
    );
};

export default EditPreguntas;

import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import styles from "../../../css/styles.module.css";

const Preguntas = ({
    preguntaActual,
    indiceActual,
    totalPreguntas,
    puntaje,
}) => {
    console.log("AQUI", preguntaActual, indiceActual, totalPreguntas, puntaje);
    const [tiempoRestante, setTiempoRestante] = useState(30);
    const [temporizador, setTemporizador] = useState(null);
    const [puntajeLocal, setPuntajeLocal] = useState(puntaje);

    useEffect(() => {
        // Iniciar el temporizador cuando el componente se monta
        iniciarTemporizador();
        setPuntajeLocal(puntaje);
    }, [puntaje]);

    const iniciarTemporizador = () => {
        if (!temporizador) {
            const id = setInterval(() => {
                setTiempoRestante((prevTiempo) => {
                    if (prevTiempo <= 1) {
                        clearInterval(id);
                        return 0;
                    }
                    return prevTiempo - 1;
                });
            }, 1000);
            setTemporizador(id);
        }
    };

    const detenerTemporizador = () => {
        clearInterval(temporizador);
        setTemporizador(null);
    };

    const verificarRespuesta = async (respuesta, index) => {
        // Obtener el token CSRF del documento
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        const response = await fetch(
            `/verificar-respuesta/${preguntaActual.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Usa la variable csrfToken para enviar el token CSRF
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({ respuesta }),
            }
        );

        const data = await response.json();

        // Lógica para cambiar el color del botón según la respuesta
        if (data.correcta) {
            document.getElementById(
                `respuesta-btn-${index}`
            ).style.backgroundColor = "green";
        } else {
            document.getElementById(
                `respuesta-btn-${index}`
            ).style.backgroundColor = "red";
        }

        // Actualiza el puntaje si es necesario
        setPuntajeLocal(data.puntaje);
    };

    const irASiguientePregunta = () => {
        const nuevoIndice = indiceActual + 1;
        if (nuevoIndice < totalPreguntas) {
            Inertia.get(`/siguiente-pregunta/${nuevoIndice}`);
        }
    };

    const irAPreguntaAnterior = () => {
        const nuevoIndice = indiceActual - 1;
        if (nuevoIndice >= 0) {
            Inertia.get(`/pregunta-anterior/${nuevoIndice}`);
        }
    };

    const reiniciarJuego = () => {
        Inertia.get(`/reiniciar-juego`);
    };

    const [respuestasFiltradas, setRespuestasFiltradas] = useState([]);

    const ayudaCincuenta = async () => {
        // Asegúrate de que preguntaActual y preguntaActual.id están definidos
        if (preguntaActual && preguntaActual.id) {
            const response = await fetch(
                `/ayuda-cincuenta/${preguntaActual.id}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                // Actualiza el estado con las respuestas filtradas
                setRespuestasFiltradas(data);
            } else {
                console.error("Error al obtener las respuestas filtradas");
            }
        }
    };

    if (!preguntaActual) return <div>Cargando...</div>;

    return (
        <div className="bg-[#010326] opacity-[0.9] text-white min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-4">
                ¿QUIEN QUIERE SER SEGURO?
            </h1>
            <div className="mb-4">
                <Link
                    className="underline text-blue-300"
                    rel="stylesheet"
                    href="/admin/preguntas"
                >
                    {" "}
                    Ver preguntas{" "}
                </Link>
            </div>
            <button
                onClick={reiniciarJuego}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
                Reiniciar juego
            </button>{" "}
            <br />
            <button
                onClick={ayudaCincuenta}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
                50/50
            </button>
            <div id="temporizador" className="mt-4 mb-4 text-2xl">
                Tiempo restante:{" "}
                <span className="font-bold">{tiempoRestante}</span> segundos
            </div>
            <button onClick={iniciarTemporizador}>Iniciar Temporizador</button>
            <button onClick={detenerTemporizador}>Detener Temporizador</button>
            <div className={styles.div}>hola soy de prueba</div>
            <div className={styles.hexagon}>
                <h2 className="text-3xl font-bold mb-4">
                    {preguntaActual.pregunta}
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border">
                {respuestasFiltradas.length > 0
                    ? respuestasFiltradas.map((respuesta, index) => (
                          <button
                              id={`respuesta-btn-${index}`}
                              key={index}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border"
                              onClick={() =>
                                  verificarRespuesta(respuesta, index)
                              }
                          >
                              {respuesta}
                          </button>
                      ))
                    : [
                          preguntaActual.respuesta1,
                          preguntaActual.respuesta2,
                          preguntaActual.respuesta3,
                          preguntaActual.respuesta4,
                      ].map((respuesta, index) => (
                          <button
                              id={`respuesta-btn-${index}`}
                              key={index}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() =>
                                  verificarRespuesta(respuesta, index)
                              }
                          >
                              {respuesta}
                          </button>
                      ))}
            </div>
            <p className="text-xl">
                Puntaje actual:{" "}
                <span className="font-bold">{puntajeLocal}</span>
            </p>
            <div>
                {/* Si indiceactual es menor que totalpreguntas quiere decir que hay mas preguntas despues de la actual se resta 1 de $totalPreguntas para ajustar el hecho de que los índices comienzan en 0 */}
                {indiceActual < totalPreguntas - 1 && (
                    <button
                        onClick={irASiguientePregunta}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Continuar
                    </button>
                )}
                {/* Verfifica si no se esta en la primera pregunta, si indiceactual es mayor que cero */}
                {indiceActual > 0 && (
                    <button
                        onClick={irAPreguntaAnterior}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Anterior
                    </button>
                )}
            </div>
        </div>
    );
};

export default Preguntas;

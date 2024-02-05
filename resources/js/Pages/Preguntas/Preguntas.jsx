import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

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
        <div>
            <h1>¿QUIEN QUIERE SER SEGURO?</h1>
            <div>
                <Link rel="stylesheet" href="/admin/preguntas">
                    {" "}
                    Ver preguntas{" "}
                </Link>
            </div>
            <button onClick={reiniciarJuego}>Reiniciar juego</button> <br />
            <button onClick={ayudaCincuenta}>50/50</button>
            <div id="temporizador">
                Tiempo restante: {tiempoRestante} segundos
            </div>
            <button onClick={iniciarTemporizador}>Iniciar Temporizador</button>
            <button onClick={detenerTemporizador}>Detener Temporizador</button>
            <h2>{preguntaActual.pregunta}</h2>
            <div>
                {respuestasFiltradas.length > 0
                    ? respuestasFiltradas.map((respuesta, index) => (
                          <button
                              id={`respuesta-btn-${index}`}
                              key={index}
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
                              onClick={() =>
                                  verificarRespuesta(respuesta, index)
                              }
                          >
                              {respuesta}
                          </button>
                      ))}
            </div>
            {/* <div>
                {[
                    preguntaActual.respuesta1,
                    preguntaActual.respuesta2,
                    preguntaActual.respuesta3,
                    preguntaActual.respuesta4,
                ].map((respuesta, index) => (
                    <button
                        id={`respuesta-btn-${index}`} // Asigna un ID único a cada botón
                        key={index}
                        onClick={() => verificarRespuesta(respuesta, index)} // Pasa el index a verificarRespuesta
                    >
                        {respuesta}
                    </button>
                ))}
            </div> */}
            <p>Puntaje actual: {puntajeLocal}</p>
            <button onClick={irASiguientePregunta}>Continuar</button>
            <button onClick={irAPreguntaAnterior}>Anterior</button>
        </div>
    );
};

export default Preguntas;

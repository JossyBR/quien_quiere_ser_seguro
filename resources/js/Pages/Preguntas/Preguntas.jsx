import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import styles from "../../../css/styles.module.css";
import Swal from "sweetalert2";
import { BsHourglassSplit } from "react-icons/bs";
import {
    FaRegPlayCircle,
    FaRegStopCircle,
    FaRedoAlt,
    FaEye,
} from "react-icons/fa";
import { MdSportsScore } from "react-icons/md";
// import {
//     NIVEL_INICIAL,
//     obtenerNuevoNivel,
//     debeSubirDeNivel,
// } from "@/Utils/preguntasUtils";

//Para manejar los niveles
const NIVEL_INICIAL = 1;
const MAX_NIVELES = 3;
const ACIERTOS_PARA_SUBIR_NIVEL = 3;

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
    const [nivelActual, setNivelActual] = useState(NIVEL_INICIAL);
    const [aciertosConsecutivos, setAciertosConsecutivos] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(false);

    //Para aplicar las clases de respuesta correcta e incorrecta
    const [claseRespuestaCorrecta, setClaseRespuestaCorrecta] = useState("");
    const [claseRespuestaIncorrecta, setClaseRespuestaIncorrecta] =
        useState("");

    // Función para determinar si el jugador debe subir de nivel
    const debeSubirDeNivel = (aciertosConsecutivos) => {
        console.log("Aciertos consecutivos:", aciertosConsecutivos); // Verificar el valor de los aciertos consecutivos
        return aciertosConsecutivos >= ACIERTOS_PARA_SUBIR_NIVEL;
    };

    // Función para obtener el nuevo nivel, si es aplicable
    const obtenerNuevoNivel = (nivelActual, aciertosConsecutivos) => {
        if (debeSubirDeNivel(aciertosConsecutivos)) {
            const nuevoNivel = nivelActual + 1;
            return nuevoNivel > MAX_NIVELES ? nivelActual : nuevoNivel;
        }
        return nivelActual;
    };

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
        // Si ya se ha seleccionado una respuesta, no hacer nada
        if (respuestaSeleccionada) {
            Swal.fire({
                title: "¡Ya has seleccionado una respuesta!",
                text: "Por favor, ve a la siguiente pregunta.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }
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
            // Si la respuesta es correcta, incrementar aciertos consecutivos
            setAciertosConsecutivos((prevAciertos) => prevAciertos + 1); // Actualizar aciertos consecutivos

            // Establecer la clase CSS para la respuesta correcta y la incorrecta seleccionada
            setClaseRespuestaCorrecta(`bg-green-500`);
            setClaseRespuestaIncorrecta(`bg-red-500`);

            // Mostrar alerta con Sweet Alert
            Swal.fire({
                title: "¡Respuesta Correcta!",
                text: "¡Has acertado la pregunta!",
                icon: "success",
                confirmButtonText: "Continuar",
            });

            // Establecer la clase CSS para la respuesta correcta
            setClaseRespuestaCorrecta("bg-green-500");
        } else {
            // Si la respuesta es incorrecta, resetear aciertos consecutivos
            setAciertosConsecutivos(0);

            // Establecer la clase CSS para la respuesta incorrecta seleccionada
            setClaseRespuestaIncorrecta(`bg-red-500`);

            // Establecer la clase CSS para la respuesta correcta
            setClaseRespuestaCorrecta(`bg-green-500`);
        }

        // Actualiza el estado de nivel después de que los aciertos consecutivos se hayan actualizado
        if (debeSubirDeNivel(aciertosConsecutivos + 1)) {
            console.log("Debería subir de nivel"); // Verificar si se detecta la condición de subir de nivel
            const nuevoNivel = obtenerNuevoNivel(
                nivelActual,
                aciertosConsecutivos + 1
            );
            console.log("Nuevo nivel:", nuevoNivel);
            setNivelActual(nuevoNivel);
            setAciertosConsecutivos(0); // Resetear contador de aciertos consecutivos
        }

        // Actualiza el puntaje si es necesario
        setPuntajeLocal(data.puntaje);

        // Desactiva la selección de respuestas
        setRespuestaSeleccionada(true);
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
        <div className={`${styles.contenedor} text-white min-h-screen p-8`}>
            <h1 className="text-xl text-center md:text-4xl font-bold mb-4">
                ¿QUIEN QUIERE SER SEGURO?
            </h1>
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <Link
                        className="flex items-center gap-1 font-bold"
                        rel="stylesheet"
                        href="/admin/preguntas"
                    >
                        {" "}
                        <FaEye className="h-4 w-4" /> Preguntas{" "}
                    </Link>
                </div>
                <div>
                    <button
                        onClick={reiniciarJuego}
                        className=" text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        <FaRedoAlt className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className=" flex items-center justify-between">
                <div>
                    <button
                        onClick={ayudaCincuenta}
                        className="border-2 rounded-full text-white font-bold px-2 "
                    >
                        50/50
                    </button>
                </div>

                <div
                    id="temporizador"
                    className="flex flex-col justify-center gap-2 items-center text-base text-center mb-2 lg:text-2xl"
                >
                    <div className="flex items-center gap-1">
                        <BsHourglassSplit className="h-4 w-4 md:h-10 md:w-10" />
                        <span className="font-bold ">
                            {tiempoRestante}{" "}
                        </span>{" "}
                        <p>Seg</p>
                    </div>

                    <div className="flex justify-center gap-2 ml-2">
                        <button onClick={iniciarTemporizador}>
                            <FaRegPlayCircle className="h-4 w-4" />
                        </button>
                        <button onClick={detenerTemporizador}>
                            <FaRegStopCircle className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>{" "}
            <br />
            <div className="nivel-actual">
                <h2>Nivel Actual: {nivelActual}</h2>
            </div>
            <div className="border mt-2">
                <h1 className="text-xl text-center md:text-4xl font-bold mb-4">
                    ¿LOGO?
                </h1>
            </div>
            <div className="border flex items-center">
                {/* //temporizador */}
            </div>
            <div className="flex gap-1 mt-4">
                <MdSportsScore className="h-7 w-7" />
                <p className="text-base">
                    {/* Puntaje actual:{" "} */}

                    <span className="font-bold text-lg">{puntajeLocal}</span>
                </p>
            </div>
            <div className={`${styles.hexagonwrapper} flex justify-center`}>
                <div className={styles.hexagon}>
                    <h2 className="text-lg font-bold mb-4 text-center">
                        {preguntaActual.pregunta}
                    </h2>
                </div>
            </div>
            <div className={`flex flex-col items-center `}>
                {respuestasFiltradas.length > 0
                    ? respuestasFiltradas.map((respuesta, index) => (
                          <button
                              id={`respuesta-btn-${index}`}
                              key={index}
                              className={`border-2 ${
                                  index ===
                                  preguntaActual.indiceRespuestaCorrecta
                                      ? claseRespuestaCorrecta
                                      : claseRespuestaIncorrecta
                              }`}
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
                              className={`${styles.respuestas} ${
                                  index ===
                                  preguntaActual.indiceRespuestaCorrecta
                                      ? claseRespuestaCorrecta
                                      : claseRespuestaIncorrecta
                              }`}
                              onClick={() =>
                                  verificarRespuesta(respuesta, index)
                              }
                          >
                              {respuesta}
                          </button>
                      ))}
            </div>
            <div className="flex justify-center mt-2">
                {/* Verfifica si no se esta en la primera pregunta, si indiceactual es mayor que cero */}
                {indiceActual > 0 && (
                    <button
                        onClick={irAPreguntaAnterior}
                        className="border-2 text-white font-bold h-10 px-4  rounded-xl"
                    >
                        Anterior
                    </button>
                )}
                {/* Si indiceactual es menor que totalpreguntas quiere decir que hay mas preguntas despues de la actual se resta 1 de $totalPreguntas para ajustar el hecho de que los índices comienzan en 0 */}
                {indiceActual < totalPreguntas - 1 && (
                    <button
                        onClick={irASiguientePregunta}
                        className="border-2  text-white font-bold h-10 px-4 rounded-xl mr-2 hover:scale-105"
                    >
                        Siguiente
                    </button>
                )}
            </div>
        </div>
    );
};

export default Preguntas;

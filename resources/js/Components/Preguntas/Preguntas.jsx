import React, { useState, useEffect } from "react";
// import { Inertia } from "@inertiajs/inertia";

const Preguntas = ({
    preguntaActual,
    indiceActual,
    totalPreguntas,
    puntajeInicial,
}) => {
    console.log(
        "AQUI",
        preguntaActual,
        indiceActual,
        totalPreguntas,
        puntajeInicial
    );
    const [tiempoRestante, setTiempoRestante] = useState(30);
    const [temporizador, setTemporizador] = useState(null);
    const [puntaje, setPuntaje] = useState(puntajeInicial);

    // useEffect(() => {
    //     // Iniciar el temporizador cuando el componente se monta
    //     iniciarTemporizador();
    // }, []);

    // const iniciarTemporizador = () => {
    //     if (!temporizador) {
    //         const id = setInterval(() => {
    //             setTiempoRestante((prevTiempo) => {
    //                 if (prevTiempo <= 1) {
    //                     clearInterval(id);
    //                     return 0;
    //                 }
    //                 return prevTiempo - 1;
    //             });
    //         }, 1000);
    //         setTemporizador(id);
    //     }
    // };

    // const detenerTemporizador = () => {
    //     clearInterval(temporizador);
    //     setTemporizador(null);
    // };

    // const verificarRespuesta = async (respuesta) => {
    //     const response = await fetch(
    //         `/verificar-respuesta/${preguntaActual.id}`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 // Asegúrate de incluir el token CSRF si es necesario
    //             },
    //             body: JSON.stringify({ respuesta }),
    //         }
    //     );
    //     const data = await response.json();
    //     // Actualizar el estado basado en la respuesta
    // };

    if (!preguntaActual) return <div>Cargando...</div>;

    return (
        <div>
            <h1>¿QUIEN QUIERE SER SEGURO?</h1>
            <div id="temporizador">
                Tiempo restante: {tiempoRestante} segundos
            </div>
            <button>Iniciar Temporizador</button>
            <button>Detener Temporizador</button>
            {/* <button onClick={detenerTemporizador}>Detener Temporizador</button> */}

            <h2>{preguntaActual.pregunta}</h2>
            <div>
                {[
                    preguntaActual.respuesta1,
                    preguntaActual.respuesta2,
                    preguntaActual.respuesta3,
                    preguntaActual.respuesta4,
                ].map((respuesta, index) => (
                    <button
                        key={index}
                        // onClick={() => verificarRespuesta(respuesta)}
                    >
                        {respuesta}
                    </button>
                ))}
            </div>

            <p>Puntaje actual: {puntaje}</p>
            <button>Continuar</button>
            <button>Anterior</button>
        </div>
    );
};

export default Preguntas;

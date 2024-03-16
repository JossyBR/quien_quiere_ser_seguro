// import { Inertia } from "@inertiajs/inertia";

export const ayudaCincuenta = async (preguntaId, setRespuestasFiltradas) => {
    if (preguntaId) {
        const response = await fetch(`/ayuda-cincuenta/${preguntaId}`, {
            headers: {
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            // Actualiza el estado con las respuestas filtradas
            setRespuestasFiltradas(data);
        } else {
            console.error("Error al obtener las respuestas filtradas");
        }
    }
};

export const reiniciarJuego = (
    setNivelActual,
    setPreguntasCorrectas,
    setPreguntasRespondidasCorrectamente
) => {
    localStorage.removeItem("estadoDelJuego"); // Limpia el estado guardado

    // Restablece los estados locales al estado inicial deseado
    setNivelActual(1);
    setPreguntasCorrectas(0);
    setPreguntasRespondidasCorrectamente(new Set());

    // Redirección o lógica adicional para reiniciar el juego
    Inertia.get(`/reiniciar-juego`);
};

export async function verificarRespuesta({
    respuesta,
    preguntaId,
    csrfToken,
    index,
    setRespuestaSeleccionada,
    detenerTemporizador,
    setPreguntasCorrectas,
    preguntasRespondidasCorrectamente,
    setPreguntasRespondidasCorrectamente,
    setPuntajeLocal,
}) {
    setRespuestaSeleccionada(true);
    detenerTemporizador();

    const response = await fetch(`/verificar-respuesta/${preguntaId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ respuesta }),
    });

//     const data = await response.json();

    if (data.correcta) {
        document.getElementById(
            `respuesta-btn-${index}`
        ).style.backgroundColor = "green";

        // Verifica si la pregunta ya ha sido respondida correctamente antes
        if (!preguntasRespondidasCorrectamente.has(preguntaActual.id)) {
            setPreguntasCorrectas(preguntasCorrectas + 1); // Incrementar solo si no se ha respondido antes
            setPreguntasRespondidasCorrectamente((prev) =>
                new Set(prev).add(preguntaActual.id)
            );
            guardarEstadoEnLocalStorage();
        }
    } else {
        document.getElementById(
            `respuesta-btn-${index}`
        ).style.backgroundColor = "red";
    }
    console.log("Preguntas correctas2", preguntasCorrectas);
    console.log("Nivel actual2:", nivelActual);

    // Actualiza el puntaje si es necesario
    setPuntajeLocal(data.puntaje);
    // setRespuestaSeleccionada(false); // Permite al usuario seleccionar una respuesta nueva en la próxima pregunta
}

// export const verificarRespuesta = async (respuesta, index) => {
//     // Obtener el token CSRF del documento
//     const csrfToken = document
//         .querySelector('meta[name="csrf-token"]')
//         .getAttribute("content");

//     const response = await fetch(`/verificar-respuesta/${preguntaActual.id}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             // Usa la variable csrfToken para enviar el token CSRF
//             "X-CSRF-TOKEN": csrfToken,
//         },
//         body: JSON.stringify({ respuesta }),
//     });

//     const data = await response.json();

//     // Lógica para cambiar el color del botón según la respuesta
//     if (data.correcta) {
//         document.getElementById(
//             `respuesta-btn-${index}`
//         ).style.backgroundColor = "green";
//     } else {
//         document.getElementById(
//             `respuesta-btn-${index}`
//         ).style.backgroundColor = "red";
//     }

//     // Actualiza el puntaje si es necesario
//     setPuntajeLocal(data.puntaje);
// };

// const irASiguientePregunta = () => {
//     const nuevoIndice = indiceActual + 1;
//     if (nuevoIndice < totalPreguntas) {
//         Inertia.get(`/siguiente-pregunta/${nuevoIndice}`);
//     }
// };

// export const irAPreguntaAnterior = () => {
//     const nuevoIndice = indiceActual - 1;
//     if (nuevoIndice >= 0) {
//         Inertia.get(`/pregunta-anterior/${nuevoIndice}`);
//     }
// };

// export const reiniciarJuego = () => {
//     Inertia.get(`/reiniciar-juego`);
// };

// const [respuestasFiltradas, setRespuestasFiltradas] = useState([]);

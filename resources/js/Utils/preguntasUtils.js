import { Inertia } from "@inertiajs/inertia";

export const iniciarTemporizador = () => {
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

export const detenerTemporizador = () => {
    clearInterval(temporizador);
    setTemporizador(null);
};

export const verificarRespuesta = async (respuesta, index) => {
    // Obtener el token CSRF del documento
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const response = await fetch(`/verificar-respuesta/${preguntaActual.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Usa la variable csrfToken para enviar el token CSRF
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ respuesta }),
    });

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

export const irAPreguntaAnterior = () => {
    const nuevoIndice = indiceActual - 1;
    if (nuevoIndice >= 0) {
        Inertia.get(`/pregunta-anterior/${nuevoIndice}`);
    }
};

export const reiniciarJuego = () => {
    Inertia.get(`/reiniciar-juego`);
};

// const [respuestasFiltradas, setRespuestasFiltradas] = useState([]);

export const ayudaCincuenta = async () => {
    // Asegúrate de que preguntaActual y preguntaActual.id están definidos
    if (preguntaActual && preguntaActual.id) {
        const response = await fetch(`/ayuda-cincuenta/${preguntaActual.id}`, {
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

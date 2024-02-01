import React from "react";
import Preguntas from "../Components/Preguntas/Preguntas";

const SerSeguro = (props) => {
    console.log("aqui props", props);
    // Aquí, `props` contiene todos los datos enviados desde Laravel a través de Inertia.
    // Estos datos incluyen la pregunta actual, el índice actual, el total de preguntas y el puntaje actual.

    return (
        <div>
            {/* 
               Se envían todas las propiedades (`props`) al componente `Preguntas`.
               Esto incluye `preguntaActual`, `indiceActual`, `totalPreguntas`, y `puntaje`.
               El uso de `{...props}` es una forma corta de pasar todas las propiedades a un componente hijo.
            */}
            <Preguntas {...props} />
        </div>
    );
};

export default SerSeguro;

import { useState, useEffect } from "react";

function useTemporizador(initialTime = 30) {
    const [tiempoRestante, setTiempoRestante] = useState(initialTime);
    const [temporizador, setTemporizador] = useState(null);      

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
        if (temporizador) {
            clearInterval(temporizador);
            setTemporizador(null);
        }
    };

    return { tiempoRestante, iniciarTemporizador, detenerTemporizador };
}

export default useTemporizador;
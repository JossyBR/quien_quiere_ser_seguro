import React, { useEffect } from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { FaRegPlayCircle, FaRegStopCircle } from "react-icons/fa";
import useTemporizador from "@/Utils/useTemporizador";

const Temporizador = () => {
    const { tiempoRestante, iniciarTemporizador, detenerTemporizador } =
        useTemporizador(30);

    useEffect(() => {
        iniciarTemporizador();
    }, []);
    return (
        <div
            id="temporizador"
            className="flex flex-col justify-center gap-2 items-center text-base text-center mb-2 lg:text-2xl"
        >
            <div className="flex items-center gap-1">
                <BsHourglassSplit className="h-4 w-4 md:h-10 md:w-10" />
                <span className="font-bold">{tiempoRestante} </span>
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
    );
};

export default Temporizador;

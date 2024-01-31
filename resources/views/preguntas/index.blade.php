<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seguridad laboral</title>
</head>
<body>

<div>
    <h1>¿QUIEN QUIERE SER SEGURO?</h1>
    <a href="{{ route('reiniciar_juego') }}">Reiniciar Juego</a>

    <button onclick='activarCincuenta({{ $preguntaActual->id }})'>50/50</button>


    <h2>{{ $preguntaActual->pregunta }}</h2>
    <div id="respuestas-{{ $preguntaActual->id }}">
    @foreach([$preguntaActual->respuesta1, $preguntaActual->respuesta2, $preguntaActual->respuesta3, $preguntaActual->respuesta4] as $index => $respuesta)
        <button id="respuesta-{{ $preguntaActual->id }}-{{ $index }}" data-pregunta-id="{{ $preguntaActual->id }}" data-respuesta="{{ $respuesta }}" onclick="verificarRespuesta(this)">
        {{ $respuesta }}
        </button>
    @endforeach

    </div>

    <div>
        <p id="puntaje">Puntaje actual: {{ session('puntaje', 0) }}</p>
    </div>
    <!-- Si indiceactual es menor que totalpreguntas quiere decir que hay mas preguntas despues de la actual se resta 1 de $totalPreguntas para ajustar el hecho de que los índices comienzan en 0-->
    @if($indiceActual < $totalPreguntas - 1) 
        <a href="{{ route('siguiente_pregunta', $indiceActual + 1) }}">Continuar</a>
    @endif

    <!-- Verfifica si no se esta en la primera pregunta, si indiceactual es mayor que cero -->
    @if($indiceActual > 0) 
        <a href="{{ route('pregunta_anterior', $indiceActual - 1) }}">Anterior</a>
    @endif
</div>


</body>

<script>
function verificarRespuesta(elemento) { //elemento es el botón clickeado

    //Se utilizan estos para acceder a los atributos data-pregunta-id y data-respuesta.
    var preguntaId = elemento.dataset.preguntaId;
    var respuestaSeleccionada = elemento.dataset.respuesta;

    fetch('{{ url("/verificar-respuesta") }}/' + preguntaId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}' //Para la seguridad de la solicitud
        },
        body: JSON.stringify({ respuesta: respuestaSeleccionada }) //Envia la respuesta seleccionada al servidor
    })
    .then(response => response.json()) //Procesa la respuesta del servidor.
    //Cambia el color de fondo de la respuesta seleccionada dependiendo de si data.correcta es verdadero (verde) o falso (rojo).
    .then(data => {
        if (data.correcta) {
            elemento.style.backgroundColor = 'green';
        } else {
            elemento.style.backgroundColor = 'red';
        }
        actualizarPuntaje(data.puntaje); // Actualiza el puntaje usando la respuesta del servidor
    });
}

function actualizarPuntaje(puntaje) {
    document.getElementById('puntaje').innerText = 'Puntaje actual: ' + puntaje;
}

function activarCincuenta(preguntaId) {
    //Se realiza una solicitud GET a la ruta del comodín 50/50
    fetch('{{ url("/ayuda-cincuenta") }}/' + preguntaId)
    .then(response => response.json()) // Procesa la respuesta como JSON.
    .then(data => {
        // console.log(data);
        // 'data' debe contener las dos respuestas que deben quedar visibles

        // Convierte 'data' en un conjunto (Set) para facilitar la comprobación
        let respuestasVisibles = new Set(data);

        // Itera sobre todos los botones de respuesta de la pregunta actual.
        document.querySelectorAll(`#respuestas-${preguntaId} button`).forEach(boton => {
            // Obtiene la respuesta asociada al botón.
            let respuesta = boton.getAttribute('data-respuesta');

            // Oculta el botón si su respuesta no está en el conjunto 'respuestasVisibles'
            if (!respuestasVisibles.has(respuesta)) {
                boton.style.display = 'none';
            }
        });
    });
}

</script>
</html>

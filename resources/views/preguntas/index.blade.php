<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seguridad laboral</title>
</head>
<body>
@foreach($preguntas as $pregunta)
<!-- <div>
    <h2>{{ $pregunta->pregunta }}</h2>
    <form action="{{ route('preguntas.create') }}" method="POST">
        @csrf
        <ul>
            <li><button type="radio" name="respuesta" value="1"> {{ $pregunta->respuesta1 }}</button></li>
            <li><button type="radio" name="respuesta" value="2"> {{ $pregunta->respuesta2 }}</button></li>
            <li><button type="radio" name="respuesta" value="3"> {{ $pregunta->respuesta3 }}</button></li>
            <li><button type="radio" name="respuesta" value="4"> {{ $pregunta->respuesta4 }}</button></li>
            <input type="text" value="{{ $pregunta->respuesta_correcta }}">
        </ul>
    </form>
</div> -->

<div>
    <h2>{{ $pregunta->pregunta }}</h2>
    <!-- Asigna un ID único a cada grupo de respuestas basado en el ID de la pregunta -->
    <div id="respuestas-{{ $pregunta->id }}">
        <!-- Itera sobre las respuestas de cada pregunta. -->
        @foreach([$pregunta->respuesta1, $pregunta->respuesta2, $pregunta->respuesta3, $pregunta->respuesta4] as $index => $respuesta)
        <button data-pregunta-id="{{ $pregunta->id }}" data-respuesta="{{ $respuesta }}" onclick="verificarRespuesta(this)">
            {{ $respuesta }}
        </button>
        @endforeach

    </div>
</div>
@endforeach  

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
    });
}

</script>
</html>

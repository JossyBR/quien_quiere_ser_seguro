<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seguridad laboral</title>
</head>
<body>
    <div class="container">
    <h1>Quien Quiere ser seguro</h1>
        @foreach($preguntas as $pregunta)
        <div>
            <h2>{{ $pregunta->pregunta }}</h2>
            <ul>
                <li>{{ $pregunta->respuesta1 }}</li>
                <li>{{ $pregunta->respuesta2 }}</li>
                <li>{{ $pregunta->respuesta3 }}</li>
                <li>{{ $pregunta->respuesta4 }}</li>
            </ul>
            <p>{{$pregunta->respuesta_correcta}}</p>
        </div>
        @endforeach  
    </div>
</body>
</html>

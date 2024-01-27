@extends('welcome')

@section('content')
<div class="container">
    <h2>Crear Preguntas</h2>
    <form method="POST"  action="{{route('pregunta.store')}}">
        @csrf
        <div class="form-group">
            <label for="pregunta">Escribe una pregunta</label>
            <input type="text" class="form-control" id="pregunta" name="pregunta" required>
        </div>

        <div class="form-group">
            <label for="respuesta1">Respuesta 1</label>
            <input type="text" class="form-control" id="respuesta1" name="respuesta1" required>
        </div>
        <div class="form-group">
            <label for="respuesta2">Respuesta 2</label>
            <input type="text" class="form-control" id="respuesta2" name="respuesta2" required>
        </div>
        <div class="form-group">
            <label for="respuesta3">Respuesta 3</label>
            <input type="text" class="form-control" id="respuesta3" name="respuesta3" required>
        </div>
        <div class="form-group">
            <label for="respuesta4">Respuesta 4</label>
            <input type="text" class="form-control" id="respuesta4" name="respuesta4" required>
        </div>
        <div class="form-group">
            <label for="respuesta_correcta">Escribe la respuesta correcta</label>
            <input type="text" class="form-control" id="respuesta_correcta" name="respuesta_correcta" required>
        </div>
        
        <button type="submit" class="btn btn-primary">Crear pregunta</button>
    </form>
</div>
@endsection

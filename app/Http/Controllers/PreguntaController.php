<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pregunta;

class PreguntaController extends Controller
{
    public function index(Request $request)
    {
        // $preguntas = Pregunta::all();
        // return view('preguntas.index', ['preguntas' =>$preguntas]);

        $preguntas = Pregunta::all(); // Obtiene todas las preguntas
        $indiceActual = $request->session()->get('indiceActual', 0); // Obtiene el índice actual de la sesión, por defecto es 0
        $preguntaActual = $preguntas->get($indiceActual);// Obtiene la pregunta actual basada en el índice

        return view('preguntas.index', [ // Devuelve la vista con los datos necesarios
        'preguntaActual' => $preguntaActual,
        'indiceActual' => $indiceActual,
        'totalPreguntas' => $preguntas->count()
    ]);
    }

    public function create()
    {
        return view('preguntas.create');
    }

    public function store (Request $request) 
    {
        $request->validate([
            'pregunta' => 'required',
            'respuesta1' => 'required',
            'respuesta2' => 'required',
            'respuesta3' => 'required',
            'respuesta4' => 'required',
            'respuesta_correcta' => 'required',
        ]);

        $preguntas = new Pregunta;
        $preguntas->pregunta = $request->pregunta;
        $preguntas->respuesta1 = $request->respuesta1;
        $preguntas->respuesta2 = $request->respuesta2;
        $preguntas->respuesta3 = $request->respuesta3;
        $preguntas->respuesta4 = $request->respuesta4;
        $preguntas->respuesta_correcta = $request->respuesta_correcta;

        $preguntas->save();

        return redirect()->route('preguntas.index')->with('status', 'Solicitud creada exitosamente!');
    }


    public function verificarRespuesta(Request $request, $id) {
        $pregunta = Pregunta::findOrFail($id); //Encuentra la pregunta por su ID. Si no existe, arroja un error 404.

        $correcta = $request->respuesta == $pregunta->respuesta_correcta;

        if ($correcta) {
            $puntaje = $request->session()->get('puntaje', 0) + 1;
            $request->session()->put('puntaje', $puntaje);
        }

        return response()->json(['correcta' => $correcta, 'puntaje' => $request->session()->get('puntaje')]);
    
        // return response()->json([
        //     'correcta' => $request->respuesta == $pregunta->respuesta_correcta
        // ]);
    }

    public function siguientePregunta(Request $request, $indice)
{
    $request->session()->put('indiceActual', $indice);
    return redirect()->route('preguntas.index');
}

public function preguntaAnterior(Request $request, $indice)
{
    $request->session()->put('indiceActual', $indice);
    return redirect()->route('preguntas.index');
}

public function reiniciarJuego(Request $request)
{
    $request->session()->forget('puntaje');
    $request->session()->forget('indiceActual');

    return redirect()->route('preguntas.index'); // O la ruta donde comienza tu juego
}

public function ayudaCincuenta(Request $request, $id) {
    // Encuentra la pregunta específica por su ID. Si no existe, arroja un error 404.
    $pregunta = Pregunta::findOrFail($id);

    // Recolecta todas las respuestas posibles de la pregunta en un array.
    $respuestas = [$pregunta->respuesta1, $pregunta->respuesta2, $pregunta->respuesta3, $pregunta->respuesta4];

    // Eliminar dos respuestas incorrectas // Filtra y recopila las respuestas incorrectas.
    $respuestasIncorrectas = array_filter($respuestas, function($respuesta) use ($pregunta) {
        return $respuesta != $pregunta->respuesta_correcta;
    });

    // Mezcla las respuestas incorrectas y selecciona las primeras dos. SHUFFLE=MEZCLA LAS RESPUESTA INCORRECTAS. ARRAY_SLICE TOMA LAS PRIMERAS DOS PARA SER ELIMINADAS
    shuffle($respuestasIncorrectas);
    $respuestasIncorrectas = array_slice($respuestasIncorrectas, 0, 2);

    // Calcula las respuestas que se deben mostrar (la correcta y una incorrecta). array_diff: Calcula cuáles respuestas deben permanecer visibles (la correcta y una incorrecta)
    $respuestasMostrar = array_diff($respuestas, $respuestasIncorrectas);
    
    // Devuelve las respuestas a mostrar como un array en formato JSON.
    return response()->json(array_values($respuestasMostrar));
    // return response()->json($respuestasMostrar);
}
    
}

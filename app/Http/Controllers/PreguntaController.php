<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pregunta;

class PreguntaController extends Controller
{
    public function index()
    {
        $preguntas = Pregunta::all();
        return view('preguntas.index', ['preguntas' =>$preguntas]);
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
    
        return response()->json([
            'correcta' => $request->respuesta == $pregunta->respuesta_correcta
        ]);
    }
    
}

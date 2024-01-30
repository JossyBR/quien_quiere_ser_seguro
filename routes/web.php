<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreguntaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pregunta', [PreguntaController::class, 'index'])->name('preguntas.index');
Route::get('/crear/pregunta', [PreguntaController::class, 'create'])->name('preguntas.create');
Route::post('/pregunta', [PreguntaController::class, 'store'])->name('pregunta.store');

Route::post('/verificar-respuesta/{id}', [PreguntaController::class, 'verificarRespuesta'])->name('verificar_respuesta');

//Esto es para manejar la siguiente y anterior pregunta
Route::get('/siguiente-pregunta/{indice}', [PreguntaController::class, 'siguientePregunta'])->name('siguiente_pregunta');
Route::get('/pregunta-anterior/{indice}', [PreguntaController::class, 'preguntaAnterior'])->name('pregunta_anterior');



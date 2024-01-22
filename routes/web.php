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

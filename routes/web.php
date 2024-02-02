<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PreguntaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Ruta para iniciar el juego
Route::get('/juego', [PreguntaController::class, 'index'])->name('juego');

// Ruta para la creación de preguntas
Route::get('/crear-pregunta', function (){
    return Inertia::render('Preguntas/CrearPreguntas');
})->name('crear-preguntas');


// Ruta para almacenar una nueva pregunta
Route::post('/pregunta', [PreguntaController::class, 'store'])->name('pregunta.store');

// Ruta para verificar una respuesta
Route::post('/verificar-respuesta/{id}', [PreguntaController::class, 'verificarRespuesta'])->name('verificar_respuesta');

// Rutas para manejar la siguiente y anterior pregunta
Route::get('/siguiente-pregunta/{indice}', [PreguntaController::class, 'siguientePregunta'])->name('siguiente_pregunta');
Route::get('/pregunta-anterior/{indice}', [PreguntaController::class, 'preguntaAnterior'])->name('pregunta_anterior');

// Ruta para reiniciar el juego
Route::get('/reiniciar-juego', [PreguntaController::class, 'reiniciarJuego'])->name('reiniciar_juego');

// Ruta para el comodín 50/50
Route::get('/ayuda-cincuenta/{id}', [PreguntaController::class, 'ayudaCincuenta'])->name('ayuda_cincuenta');





//Para auth, por ahora no lo estoy utilizando
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

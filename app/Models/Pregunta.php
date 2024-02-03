<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
    use HasFactory;

    protected $fillable = ['pregunta', 'respuesta1', 'respuesta2', 'respuesta3', 'respuesta4', 'respuesta_correcta'];

}

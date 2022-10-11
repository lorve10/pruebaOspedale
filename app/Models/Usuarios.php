<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    use HasFactory;
    protected $table = "tb_usuarios";
    protected $fillable = [
        'nombre',
        'documento',
        'genero',
        'fecha_nacimiento',
        'telefono',
        'eps_id',
        'rol_id'
    ];

    public function eps(){
        return $this->hasOne("App\Models\Eps", "id", "eps_id");
    }
    public function rol(){
        return $this->hasOne("App\Models\Rol", "id", "rol_id");
    }
}

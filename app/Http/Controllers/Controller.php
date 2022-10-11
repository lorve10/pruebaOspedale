<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Usuarios;
use App\Models\Eps;
use App\Models\Rol;
use Illuminate\Http\Request;
use Log;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function getUser(){
        try {
            $data = Usuarios::with('eps','rol')->where('estado',0)->get();
            return response()->json(['message' => "Successfully loaded", 'data'=> $data, 'success' => true ], 200);
          } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage(), 'success' => false ], 500);
          }
    }
    public function getEps(){
        try {
            $data = Eps::get();
            return response()->json(['message' => "Successfully loaded", 'data'=> $data, 'success' => true ], 200);
          } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage(), 'success' => false ], 500);
          }
    }
    public function getRol(){
        try {
            $data = Rol::get();
            return response()->json(['message' => "Successfully loaded", 'data'=> $data, 'success' => true ], 200);
          } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage(), 'success' => false ], 500);
          }
    }

    public function registrar(Request $request){
        try {
        Log::info($request);
        $id = $request['id'];



        $data['nombre'] = $request['nombre'];
        $data['documento'] = $request['documento'];
        $data['genero'] = $request['genero'];
        $data['fecha_nacimiento'] =$request['fecha_nacimiento'];
        $data['telefono'] = $request['telefono'];
        $data['eps_id'] = $request['eps_id'];
        $data['rol_id'] =$request['rol_id'];

        if($id > 0){
            Usuarios::find($id)->update($data);
        }
        else{
            Usuarios::create($data);
        }
        return response()->json([ 'message' => "Successfully created", 'success' => true ], 200);

    } catch (\Exception $e) {
      return response()->json([ 'message' => $e->getMessage(), 'success' => false ], 500);
    }
    }

    public function eliminar(Request $request){

        try {
            Log::info($request['id']);
            Usuarios::where('id', $request['id'])->update([
                'estado'=>1
            ]);
            return response()->json([ 'message' => "Successfully created", 'success' => true ], 200);

        } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage(), 'success' => false ], 500);

        }


    }
}

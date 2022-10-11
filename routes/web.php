<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthControllers\AuthController;

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

Route::get('/', function () {
    return view('login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home')->middleware('auth');
Route::get('/getUser', [App\Http\Controllers\Controller::class, 'getUser'])->middleware('auth');
Route::get('/getEps', [App\Http\Controllers\Controller::class, 'getEps'])->middleware('auth');
Route::get('/getRol', [App\Http\Controllers\Controller::class, 'getRol'])->middleware('auth');
Route::post('/registrar', [App\Http\Controllers\Controller::class, 'registrar'])->middleware('auth');
Route::post('/eliminar', [App\Http\Controllers\Controller::class, 'eliminar'])->middleware('auth');
Route::get('logout', 'Auth\LoginController@logout')->name('logout');


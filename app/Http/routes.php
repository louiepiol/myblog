<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::group(array('prefix' => 'api/v1'), function() {
	//Login
	Route::resource('authenticate', 'Auth\AuthController', ['only' => ['index']]);
	Route::post('authenticate', 'Auth\AuthController@authenticate');
    //Post
    Route::resource('posts', 'PostController');
	Route::post('posts','PostController@store');
	Route::put('posts/{id}','PostController@update');
	Route::get('posts/{id}','PostController@show');
	Route::delete('posts/delete/{id}','PostController@destroy');
	//Users
	Route::post('users','UserController@store');
	Route::put('users/{id}','UserController@update');
    Route::get('users/{id}/posts', 'UserController@post_by_author');
    Route::resource('users/me', 'UserController@me');
    Route::get('users/profile/{id}', 'UserController@show');
	Route::resource('users','UserController');
	//Route::get('posts',['uses' => 'PostController@index']);
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});

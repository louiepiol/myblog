<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Posts;
use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Response;
use Validator;
use Auth;
use Hash;

class UserController extends Controller {
    
	public function __construct() {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['store']]);
    }

    public function index() {

        // Retrieve all the users in the database and return them        
        if(Auth::user()->role == 'admin') {
        	$users = User::all();
       		return Response::json($users, 200);
        } else {
        	abort(401, 'Page not found');
        }
    }

    public function me() {
    	$user = Auth::user();
        return Response::json($user, 200);
    }

      /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $extend_rules = [
		    'password'         => 'required',
        	'password_confirm' => 'required|same:password'
		];
		$validator = Validator::make(Input::all(), User::rules('', $extend_rules));
        if ($validator->fails()) {
          return Response::json(array('errors' => $validator->messages()), 400);
        }

        $user = new User;
        $user->name = Input::get('name');
        $user->email = Input::get('email');
        $user->password = Hash::make(Input::get('password'));
        if(Input::get('role')) {
        	$user->role = Input::get('role');
        }
        $saved = $user->save();

        if(!$saved) {
            abort(502, 'Internal error');
        }

        return Response::json(array($user), 201);
    }

    /**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id) {
		$user = User::find($id, array('id', 'name', 'email', 'role', 'created_at'));
        $posts = Posts::with('author')->where('author_id', $user['id']) -> count();
        $user = array_add($user, 'total_post', $posts);
        return Response::json($user, 200);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request, $id) {
		$user_id = $id;
        $validator = Validator::make(Input::all(), User::rules($user_id));
        if ($validator->fails()) {
          return Response::json(array('errors' => $validator->messages()), 400);
        }

		$user = User::find($user_id);
		if($user && (Auth::user()->role == 'admin')) {
			$user->name = Input::get('name');
        	$user->email = Input::get('email');
        	$user->role = Input::get('role');
        	$saved = $user->save();

			if(!$saved) {
	        	abort(502, 'Internal error');
	        }

	        return Response::json(array($user), 200);

		} else {
        	abort(400, 'Invalid Parameters');
		}
	}

	
	/**
	 * Display the all resource by author.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function post_by_author($id) {
		$posts = Posts::with('author')->where('author_id', $id)->orderBy('created_at', 'desc')->get();
        return Response::json(array(
            'posts' => $posts
        ), 200);
	}}

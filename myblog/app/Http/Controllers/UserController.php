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
        $users = User::all();

        return $users;
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
    	$validator = Validator::make(Input::all(), [
            'name' => 'required|unique:users|min:2|max:255',
			'email' => array(
                'required',
                'max:50',
                'email',
                'unique:users'
            ),
            'password'         => 'required',
        	'password_confirm' => 'required|same:password'  
        ]);

        if ($validator->fails()) {
          return Response::json(array('errors' => $validator->messages()), 400);
        }

        $user = new User;
        $user->name = Input::get('name');
        $user->email = Input::get('email');
        $user->password = Hash::make(Input::get('password'));
        $user->role = Input::get('role');
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
		$user = User::find($id, array('id', 'name', 'email', 'created_at'));
        $posts = Posts::with('author')->where('author_id', $user['id']) -> count();
        $user = array_add($user, 'total_post', $posts);
        return Response::json($user, 200);
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

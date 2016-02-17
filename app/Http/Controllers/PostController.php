<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Posts;
use Auth;
use Validator;
use Response;

class PostController extends Controller {

	public function __construct() {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    public function index() {
	    $posts = Posts::with('author')->orderBy('created_at', 'desc')->get();
        return Response::json(array(
            'posts' => $posts
        ), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
    	$validator = Validator::make(Input::all(), [
            'title' => 'required|unique:posts|min:2|max:255',
            'body' => 'required|min:2|max:1024',
            'author_id' => 'required',
        ]);

        if ($validator->fails()) {
          return Response::json(array('errors' => $validator->messages()), 400);
        }

        $post = new Posts;
        $post->title = Input::get('title');
        $post->body = Input::get('body');
        $post->author_id = Input::get('author_id');
		$post->active = 1;
        $saved = $post->save();

        if(!$saved) {
            abort(502, 'Internal error');
        }

        return Response::json(array($post), 201);
    }

    /**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id) {
		$post = Posts::with('author')->find($id, array('id', 'title',
            'body', 'author_id', 'created_at'));
        return Response::json($post, 200);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request, $id) {
        $validator = Validator::make(Input::all(), [
            'title' => 'required|min:2|max:255',
            'body' => 'required|min:2|max:1024',
        ]);

        if ($validator->fails()) {
          return Response::json(array('errors' => $validator->messages()), 400);
        }

        $post_id = $id;
		$post = Posts::find($post_id);
		if($post && ($post->author_id == Auth::user()->id || Auth::user()->role == 'admin')) {
			$post->title = Input::get('title');
        	$post->body = Input::get('body');
        	$saved = $post->save();

			if(!$saved) {
	        	abort(502, 'Internal error');
	        }

	        return Response::json(array($post), 200);

		} else {
        	abort(400, 'Invalid Parameters');
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy(Request $request, $id) {
		//
		$post = Posts::find($id);
		if($post && ($post->author_id == Auth::user()->id  || Auth::user()->role == 'admin')) {
			$post->delete();
	        return Response::json(array(), 200);
		} else {
        	abort(400, 'Invalid Parameters');
		}
	}
}

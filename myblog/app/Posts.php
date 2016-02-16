<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $table = 'posts';

    /**
     * Get the author that wrote the book.
     */
    public function author()
    {
        return $this->belongsTo('App\User');
    }
}

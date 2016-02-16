<?php

class PostResourceTest extends TestCase
{
    public function testPOSTandGET()
    {
        $res = $this->call('POST', '/api/posts',
            ['title' => 'Lorem Ipsum',
             'body' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
             'author_id' => 1]);
        $data = json_decode($res->getContent());
        $this->assertTrue($data->id > 0);

        $this->get('/api/posts/' . $data->id)
             ->seeJsonStructure([
                 'id',
                 'title',
                 'body',
                 'author_id',
                 'created_at'
             ]);
    }

    public function testIndex()
    {
        $this->get('/api/posts')
            ->seeJsonStructure([
               'posts'
            ]);
    }
}

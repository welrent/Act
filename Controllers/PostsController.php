<?php
class PostsController extends Controller {
    public function index() {
        $db = Database::getInstance()->getConnection();
        
        $stmt = $db->query("SELECT * FROM posts ORDER BY created_at DESC");
        $posts = $stmt->fetchAll();

        $this->view('posts', [
            'title' => 'Blog - Welrent Act',
            'posts' => $posts
        ]);
    }

    public function show($slug) {
        $db = Database::getInstance()->getConnection();
        
        $stmt = $db->prepare("SELECT * FROM posts WHERE slug = :slug LIMIT 1");
        $stmt->execute(['slug' => $slug]);
        $post = $stmt->fetch();

        if (!$post) {
            die("Post not found");
        }

        $this->view('post_detail', [
            'title' => $post['title'],
            'post' => $post
        ]);
    }
}

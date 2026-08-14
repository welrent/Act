<?php
class Router {
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = [];

    public function __construct() {
        // Register autoload for controllers
        spl_autoload_register(function ($class_name) {
            if (file_exists('Controllers/' . $class_name . '.php')) {
                require_once 'Controllers/' . $class_name . '.php';
            }
        });
    }

    public function parseUrl() {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
        return [];
    }

    public function route() {
        $url = $this->parseUrl();

        if (isset($url[0]) && file_exists('Controllers/' . ucfirst($url[0]) . 'Controller.php')) {
            $this->controller = ucfirst($url[0]) . 'Controller';
            unset($url[0]);
        } else if (isset($url[0])) {
            // Check if it's a dynamic custom page or post by slug? Let's route 404 for now
            // But we have /post/slug and /page/slug functionality requested.
            // If the first segment doesn't match a Controller, it might be a page. Let's just use PagesController.
            if ($url[0] === 'post' && isset($url[1])) {
                $this->controller = 'PostsController';
                $this->method = 'show';
                $this->params = [$url[1]];
                unset($url[0], $url[1]);
            } else if ($url[0] === 'page' && isset($url[1])) {
                $this->controller = 'PagesController';
                $this->method = 'show';
                $this->params = [$url[1]];
                unset($url[0], $url[1]);
            } else {
                require_once 'Controllers/PagesController.php';
                $this->controller = 'PagesController';
                $this->method = 'notFound';
                $this->params = [];
            }
        }

        if (!class_exists($this->controller)) {
            require_once 'Controllers/' . $this->controller . '.php';
        }
        $this->controller = new $this->controller;

        if (isset($url[1])) {
            if (method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        }

        $this->params = $url ? array_values($url) : $this->params;

        if (method_exists($this->controller, $this->method)) {
            call_user_func_array([$this->controller, $this->method], $this->params);
        } else {
            require_once 'Controllers/PagesController.php';
            $fallback = new PagesController();
            call_user_func([$fallback, 'notFound']);
        }
    }
}

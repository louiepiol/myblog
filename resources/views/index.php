<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <base href="/">
        <title>Blog Demo</title>
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:300' rel='stylesheet' type='text/css'>
        <link href="css/app.css" rel="stylesheet">
    </head>
    <body ng-app="blogApp">

        <div ui-view="header"></div>
        <div class="container">
            <div ui-view="container"></div>        
        </div>     

    </body>

    <!-- Application Dependencies -->
    <script type="text/javascript" src="bower_components/jquery/dist/jquery.js"></script>
    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.js"></script>
    <script src="node_modules/angular-ui-router/build/angular-ui-router.js"></script>
    <script src="node_modules/satellizer/satellizer.js"></script>
    <script type="text/javascript" src="bower_components/tinymce-dist/tinymce.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-tinymce/src/tinymce.js"></script>
    
    <!-- Application Scripts -->
    <script src="routes/app.js"></script>
    <script src="auth/auth.controller.js"></script>
    <script src="navbar/navbar.controller.js"></script>
    <script src="user/user.controller.js"></script>
    <script src="user/form/user.form.controller.js"></script>
    <script src="user/list/user.list.controller.js"></script>
    <script src="post/form/post.form.controller.js"></script>
    <script src="post/list/post.controller.js"></script>
    <script src="services/auth.service.js"></script>
    <script src="services/API.service.js"></script>
</html>
Blog App (using Laravel 5)
==========================
This is a basic personal blog web app using Laravel 5

### Local dev environment setup

    # Ensure php is installed
    $ php -v
    PHP 5.5.30 (cli) (built: Oct 23 2015 17:21:45)
    Copyright (c) 1997-2015 The PHP Group
    Zend Engine v2.5.0, Copyright (c) 1998-2015 Zend Technologies

    # Install composer and laravel (if necessary)
    $ curl -sS https://getcomposer.org/installer | php
    $ mv composer.phar /usr/local/bin/composer
    $ composer global require "laravel/installer"

    # Add composer binaries to the global path
    $ export PATH=$PATH:~/.composer/vendor/bin

    # Check if laravel installer is installed correctly
    $ laravel -V
    Laravel Installer version 1.3.1

### Dev workflow

    # Install dependencies
    composer install --prefer-dist

    # Run database migrations
    php artisan migrate

    # Run the server
    php artisan serve

### DB migrations

    # Create a new migration to create a database table
    php artisan make:migration create_posts_table --create=posts

    # Run database migrations
    php artisan migrate

    # Seeding the database
    php artisan db:seed

    # Re-seeding the database
    php artisan migrate:refresh --seed

// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/JS/app.js', 'public/JS/app.js').sass('resources/scss/style.scss', 'public/css/style.css');
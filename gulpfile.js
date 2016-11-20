var gulp = require('gulp');

var clean = require('gulp-clean')
    , uglify = require('gulp-uglify')
    , sass = require('gulp-sass')
    , cssnano = require('gulp-cssnano')
    , concat = require('gulp-concat')
    , sourcemaps = require('gulp-sourcemaps')
    , server = require('browser-sync').create();

var targetDirectory = './dist/';
var stylesTargetDirectory = './dist/css/';
var scriptsTargetDirectory = './dist/scripts/';

var components = {
    html: [
        'app/*.html',
        'app/**/*.html'
    ],
    styles: [
        'app/*.scss',
        'app/**/*.scss'
    ],
    scripts: [
        'app/*.js',
        'app/**/*.js'
    ],
    vendor: [
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'bower_components/lodash/dist/lodash.js',
        'bower_components/moment/moment.js'
    ]
};

gulp.task('default', ['browser-sync']);

gulp.task('clean', function () {
    return gulp.src(targetDirectory)
        .pipe(clean({force: true}))
});

gulp.task('browser-sync', ['watch'], function () {
    var serverConfiguration = {
        ui: false,
        port: 3000,
        server: {
            baseDir: targetDirectory
        },
        open: true,
        directory: false
    }
    server.init(serverConfiguration);
});

gulp.task('watch', ['build'], function () {
    gulp.watch(components.html, ['watch:bundle:html']);
    gulp.watch(components.scripts, ['watch:bundle:scripts']);
    gulp.watch(components.styles, ['watch:bundle:styles']);
});

gulp.task('build', ['bundle:html', 'bundle:styles', 'bundle:scripts'], function () {
    server.reload();
});

gulp.task('reload', function () {
    server.reload();
});

gulp.task('bundle:html', function () {
    return gulp.src(components.html)
        .pipe(gulp.dest(targetDirectory));
});

gulp.task('bundle:styles', function () {
    return gulp.src(components.styles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(stylesTargetDirectory));
});

gulp.task('bundle:scripts', function () {
    var scripts = components.vendor.concat(components.scripts);
    return gulp.src(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify({'ascii-only': true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(scriptsTargetDirectory));
});

gulp.task('watch:bundle:html', ['bundle:html'], function () {
    server.reload();
});

gulp.task('watch:bundle:styles', ['bundle:styles'], function () {
    server.reload();
});

gulp.task('watch:bundle:scripts', ['bundle:scripts'], function () {
    server.reload();
});

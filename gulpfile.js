// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var strip = require('gulp-strip-comments');

var replace = require('gulp-replace');


// File paths
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js',
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')); // put final CSS in dist folder
}

function jsFilesTask() {
    return src([
            // 'app/js/jquery-3.2.1.js',
            // 'app/js/tether.min.js',
            // 'app/js/bootstrap.js', 'app/js/theme.js',
            'app/js/gdpr.js',
        ])
        .pipe(strip())
        .pipe(dest('dist/js'));
}
// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
    return src([
            // 'app/js/jquery-3.2.1.js',
            // 'app/js/tether.min.js',
            // 'app/js/bootstrap.js',
            'app/js/theme.js',
            'app/js/gdpr.js',

            //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist'));
}

// Cachebust
var cbString = new Date().getTime();

function cacheBustTask() {
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
    watch([files.scssPath, files.jsPath],
        series(
            parallel(scssTask, jsTask, jsFilesTask),
            cacheBustTask
        )
    );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask, jsFilesTask),
    cacheBustTask,
    watchTask
);
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var rev = require('gulp-rev-append');
var	uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
// var wiredep = require('wiredep').stream;

 
gulp.task('sass', function () {
  gulp.src('app/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('app/sass/*.scss', ['sass']);
});

// server connect (root: '',) eto komment

gulp.task('connect', function() {
  connect.server({
  root: 'public',
  livereload: true
  });
});

//css
gulp.task('css', function() {
 gulp.src('app/css/*.css')
  .pipe(concatCss('style.css'))
  .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'IE 7'],
            cascade: false
        }))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('public/css'))
  .pipe(connect.reload());

});

// babel
// gulp.task('babel', function() {
//   return gulp.src('app/babel/*.js')
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest('app/js/'))
//   .pipe(connect.reload());
// });

// js
gulp.task('js', function () {
  gulp.src(['app/js/*.js'])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
  .pipe(connect.reload());
});

//image
// gulp.task('img', function () {
//     gulp.src('app/img/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('public/img'))
//         .pipe(connect.reload());
// });

//html
// gulp.task('html', function () {
//   gulp.src('app/html/*.html')
//     .pipe(connect.reload());
// });

// Кеширование
// gulp.task('rev', function() {
//   gulp.src('app/html/*.html')
//     .pipe(rev())
//     .pipe(gulp.dest('public'))
//     .pipe(connect.reload());
// });

gulp.task('html', function () {
  gulp.src(['app/html/*.html'])
  .pipe(gulp.dest('public'))
  .pipe(connect.reload());
});

// //wiredep bower, 
// gulp.task('bower', function () {
//   gulp.src('./public/index.html')
//     .pipe(wiredep({
//       directory : "app/bower_components"
//     }))
//     .pipe(gulp.dest('./public'));
// });

//watch
gulp.task('watch', function() {
    gulp.watch('app/css/*.css', ['css'])
    // gulp.watch('app/babel/*.js', ['babel'])
    gulp.watch('app/js/*.js', ['js'])
    // gulp.watch('app/img/*', ['img'])
    gulp.watch('app/html/*.html', ['html'])
});

//default
gulp.task('default', ['connect', 'html', 'css', 'js', 'watch', 'sass', 'sass:watch']);

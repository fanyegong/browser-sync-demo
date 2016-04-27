// http://www.gulpjs.com.cn/docs/recipes/server-with-livereload-and-css-injection/
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var ssi = require('browsersync-ssi');

gulp.task('sass', function() {
    return gulp.src('app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css/'))
        .pipe(reload({ stream:true }));
});

//gulp.task('sass', function() {
//    return sass('app/scss/main.scss')
//        .pipe(gulp.dest('app/css/'))
//        .pipe(reload({ stream:true }));
//});

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('serve', ['sass'], function() {
    browserSync({
        server: {
            baseDir: 'app',
            middleware: ssi({
                baseDir: __dirname + '/app',
                ext: '.html',
                version: '1.4.0'
            })
        }
    });

    gulp.watch('app/scss/*.scss', ['sass']);
});
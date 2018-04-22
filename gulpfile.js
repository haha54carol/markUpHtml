let gulp = require('gulp');
let less = require('gulp-less');
let browserSync = require('browser-sync').create();
let htmlImport = require('gulp-html-import');
let lessImport = require('gulp-less-import');

//compile less to css
gulp.task('less', function() {
    return gulp.src(['src/less/**.less'])
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//combine html component
gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(htmlImport('./src/components/'))
        .pipe(gulp.dest('dist'));
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

gulp.task('thirdPartyJS', function() {
    return gulp.src(['src/semanticUI/**.js'])
        .pipe(gulp.dest('dist/semantic/'))
});

gulp.task('thirdPartyCSS', function() {
    return gulp.src(['src/semanticUI/**.css'])
        .pipe(gulp.dest('dist/semantic/'))
});

gulp.task('thirdPartyFont', function() {
    return gulp.src(['src/semanticUI/fonts/'])
        .pipe(gulp.dest('dist/semantic/themes/default/assets/fonts'))
});

gulp.task('images', function() {
    return gulp.src(['src/images/**'])
        .pipe(gulp.dest('dist/images'))
});



gulp.task('dev', ['thirdPartyFont', 'thirdPartyJS','thirdPartyCSS','images', 'less', 'html', 'browserSync'], function() {
    gulp.watch('src/less/app.less', ['less']);
    gulp.watch('src/components/**.html', ['html']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('src/index.html', ['html']);
    gulp.watch('dist/index.html', browserSync.reload);
});


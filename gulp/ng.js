/* jshint node: true */
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('buildJs', function() {
	return gulp.src(['ng/module.js', 'ng/**/*.js'], { base: 'ng' })
	.pipe(sourcemaps.init({loadMaps: true})) // Note: all (!!!) plugins used between sourcemaps.init()/.write() must be gulp-sourcemaps compatible
	.pipe(concat('app.js'))
	.pipe(ngAnnotate()) // order matters! ngAnnotate must set $injects BEFORE minification with uglify
	.pipe(uglify())
	.pipe(sourcemaps.write('sourcemaps', { includeContent: true })) // if no output dir is specified, sourcemap is inlined; per default sourcemap includes (vs. references) the code, just make it explicit here 
	.pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['buildJs'], function() { // task depends on 'buildJs', therefore 'buildJs' is run before this task
	gulp.watch('ng/**/*.js', ['buildJs']); // whenever something changes in 'ng/**/*.js' run tasks in arr ['buildJs']
});

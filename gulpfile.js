
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var watch = require('gulp-watch');
var browserify = require('browserify');
var watchify = require('watchify');
var _ = require('lodash');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');



gulp.task('default', ['test', 'watch']);

gulp.task('test', function(){
	runSequence('clean', 'run-tests');
});

gulp.task('build', ['lint']);



var sources = ['lib/**/*.js', 'test/**/*.js', 'gulpfile.js'];
var isDev = false;


gulp.task('clean', function(callback){
	del(['tmp'], callback);
});


gulp.task('run-tests', ['build', 'build-tests'], function() {
    return gulp.src('test/runner.html')
    	.pipe(plugins.mochaPhantomjs({reporter: 'spec'}));
});


gulp.task('lint', function() {
	return gulp.src(sources)
			.pipe(plugins.jshint('.jshintrc'))
				.pipe(plugins.jshint.reporter('default'));
});





gulp.task('build-tests', function() {
	return runBrowserify({
		isDev : isDev,
		src: './test/test.js',
		bundle: 'test.js',
		dest: 'tmp/test'
	});
});


gulp.task('watch', function() {
	isDev = true;

	watch(sources, function() {
		gulp.start('run-tests');
	});
});

 



function runBrowserify(config)
{
	var setup = {
		entries: config.src,
		paths: ['./node_modules', './lib/']
	};

	if (config.isDev)
	{
		_.extend(setup, watchify.args, { debug: true });
	}

	var b = browserify(setup);

	if (config.isDev)
	{
		b = watchify(b);
      	b.on('update', bundle);
      	b.on('log', gutil.log);
	}

	function bundle()
	{
		return b
			.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
				.pipe(source(config.bundle))
					.pipe(gulp.dest(config.dest));
	}

	return bundle();
}


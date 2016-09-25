// Load plugins
//var gutil = require('gulp-util');
//gutil.log = function() {};
////process.argv.push('-q');

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notifier = require('node-notifier');
var del = require('del');
var blessed = require('blessed');
var tail = require('tail').Tail;
var nodemon = require('nodemon');
var fs = require('fs');
var moment = require('moment');

//notifier.logLevel(0);

var traceLog = new tail('logs/log.txt', '\n', {}, true);

var formatDate = function(d) {
	return '[{yellow-fg}' + moment(d).format('hh:mm:ss') + '{/yellow-fg}] ';
};

traceLog.on('line', function(data) {
	var json = JSON.parse(data);
	logBox.pushLine(formatDate(json.time) + json.msg);
	screen.render();
});

var screen = blessed.screen({
	smartCSR: true,
	resizeTimeout: 300,
	title: 'Gulp!'
});

var gulpBox = blessed.log({
	parent: screen,
	top: '0',
	left: '0',
	width: '50%',
	height: '33%',
	border: 'line',
	tags: true,
	scrollback: 100,
	scrollbar: {
		ch: ' ',
		fg: 'white',
		track: {
			bg: 'yellow'
		},
		style: {
			inverse: true,
		}
	},
	label: 'Gulp log',
});

var stylesBox = blessed.log({
	parent: screen,
	top: gulpBox.height,
	left: '0',
	width: '50%',
	height: gulpBox.height,
	border: 'line',
	tags: true,
	scrollback: 100,
	scrollbar: {
		ch: ' ',
		fg: 'white',
		track: {
			bg: 'yellow'
		},
		style: {
			inverse: true,
		}
	},
	label: 'Styles log',
});

var scriptsBox = blessed.log({
	parent: screen,
	top: gulpBox.height * 2,
	left: '0',
	width: '50%',
	height: gulpBox.height,
	border: 'line',
	tags: true,
	scrollback: 100,
	scrollbar: {
		ch: ' ',
		fg: 'white',
		track: {
			bg: 'yellow'
		},
		style: {
			inverse: true,
		}
	},
	label: 'Scripts log',
});

var logBox = blessed.log({
	parent: screen,
	top: '0',
	left: '50%',
	width: '50%',
	height: gulpBox.height * 3,
	border: 'line',
	tags: true,
	scrollback: 100,
	scrollbar: {
		ch: ' ',
		fg: 'white',
		track: {
			bg: 'yellow'
		},
		style: {
			inverse: true,
		}
	},
	label: 'Bunyan',
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return screen.destroy();
});

// Render the screen.
screen.render();

// Styles - compile custom Sass
gulp.task('styles', function() {
	return gulp.src([
		'src/sass/main.scss'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			stylesBox.pushLine(formatDate(new Date()) + '{red-fg}' + err.message + '{/red-fg}');
			screen.render();

			notifier.notify({
				title: 'Error in styles stask',
				message: err.message
			});

			this.emit('end');
		}
	}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(gulp.dest('public/css'))
	.pipe(cssnano({ zindex: false }))
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('public/css'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('public/css'))
	.on('end', function() {
		stylesBox.pushLine(formatDate(new Date()) + 'Styles task completed.');
		screen.render();

		notifier.notify({
			title: 'Styles task completed',
			message: 'Success'
		});
	});
});
 
// Scripts - compile custom js
gulp.task('scripts', function() {
	return gulp.src([
		'src/js/script.js'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			scriptsBox.pushLine(formatDate(new Date()) + '{red-fg}' + err.message + '{/red-fg}');
			screen.render();

			notifier.notify({
				title: 'Error in scripts task',
				message: err.message
			});

			this.emit('end');
		}
	}))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest('public/js'))
	.on('end', function() {
		scriptsBox.pushLine(formatDate(new Date()) + 'Scripts task completed.');
		screen.render();

		notifier.notify({
			title: 'Scripts task completed',
			message: 'Success'
		});
	});
});

// Start - starts the server and restarts it on file change
gulp.task('start', function() {
	nodemon({
		script: 'server.js',
		ext: 'js',
		stdout: false,
		watch: ['server/*', 'server.js']
	})
	.on('start', function(event) {
		gulpBox.pushLine(formatDate(new Date()) + 'Server started.');
		screen.render();
	})
	/*
	.on('restart', function() {
		gulpBox.pushLine('{yellow-fg}' + formatDate(new Date()) + '{/yellow-fg} Server restarting...');
		screen.render();
	})
	*/
	.on('crash', function() {
		gulpBox.pushLine(formatDate(new Date()) + '{red-fg}Server crashed!{/red-fg}');
		screen.render();

		notifier.notify({
			title: 'Server crashed.',
			message: 'Error'
		});
	});
});
 
// Watch - watcher for changes in scss and js files: 'gulp watch' will run these tasks
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('src/sass/**/*.scss', ['styles']);
 
	// Watch .js files
	gulp.watch('src/js/script.js', ['scripts']);
});

/*
// Build - task to concat and minify all javascript: 'gulp build' will run this task
gulp.task('vendor-scripts', function() {
	return gulp.src([
		'scripts/vendor/jquery-1.11.3.min.js',
		'scripts/vendor/jquery.validate.min.js',
		'scripts/vendor/jquery.validate.unobtrusive.min.js',
		'scripts/vendor/modal.js',
		'scripts/vendor/nouislider.min.js',
		'scripts/vendor/swiper.jquery.min.js',
		'scripts/vendor/jquery.cookie.js'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			//console.log(err);
			notifier.notify.onError({
				message: 'Error in vendor-scripts task: <%= error.message %>'
			})(err);
			this.emit('end');
		}
	}))
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('scripts'))
	.pipe(notifier.notify({ message: 'Vendor-scripts task completed' }));
});
*/

// Default - runs the scripts, styles and watch tasks: 'gulp' will run this task
gulp.task('default', ['styles', 'scripts', 'start', 'watch'])

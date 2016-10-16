// Load plugins
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

var cli = false;
var gulpBoxl
var stylesBox;
var scriptsBox;
var logBox;
var screen;

var formatDate = function(d) {
	var date = new Date(d);
	var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

	return '[{yellow-fg}' + time + '{/yellow-fg}] ';
};

gulp.task('cli', function() {
	var fs = require('fs');

	cli = true;

	if (!fs.existsSync('logs/log.txt')) {
		if (!fs.existsSync('logs')) {
			fs.mkdirSync('logs');
		}

		fs.writeFileSync('logs/log.txt', '');
	}

	var traceLog = new tail('logs/log.txt', '\n', {}, true);

	traceLog.on('line', function(data) {
		var json = JSON.parse(data);
		logBox.pushLine(formatDate(json.time) + json.msg);
		screen.render();
	});

	screen = blessed.screen({
		smartCSR: true,
		resizeTimeout: 300,
		title: 'Gulp!'
	});

	gulpBox = blessed.log({
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

	stylesBox = blessed.log({
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

	scriptsBox = blessed.log({
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

	logBox = blessed.log({
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
});


// Styles - compile custom Sass
gulp.task('styles', function() {
	return gulp.src([
		'src/sass/main.scss'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			if (cli) {
				stylesBox.pushLine(formatDate(new Date()) + '{red-fg}' + err.message + '{/red-fg}');
				screen.render();
			}

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
		if (cli) {
			stylesBox.pushLine(formatDate(new Date()) + 'Styles task completed.');
			screen.render();
		}

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
			if (cli) {
				scriptsBox.pushLine(formatDate(new Date()) + '{red-fg}' + err.message + '{/red-fg}');
				screen.render();
			}

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
		if (cli) {
			scriptsBox.pushLine(formatDate(new Date()) + 'Scripts task completed.');
			screen.render();
		}

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
		if (cli) {
			gulpBox.pushLine(formatDate(new Date()) + 'Server started.');
			screen.render();
		}
	})
	/*
	.on('restart', function() {
		gulpBox.pushLine('{yellow-fg}' + formatDate(new Date()) + '{/yellow-fg} Server restarting...');
		screen.render();
	})
	*/
	.on('crash', function() {
		if (cli) {
			gulpBox.pushLine(formatDate(new Date()) + '{red-fg}Server crashed!{/red-fg}');
			screen.render();
		}

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

// Default - runs the scripts, styles and watch tasks: 'gulp' will run this task
gulp.task('default', ['cli', 'styles', 'scripts', 'start', 'watch'])

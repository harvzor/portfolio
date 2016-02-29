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
var notify = require('gulp-notify');
var del = require('del');

// Styles
gulp.task('styles', function() {
	return gulp.src([
		'src/sass/main.scss'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			console.log(err);
			notify.onError({
				message: 'Error in styles task: <%= error.message %>'
			})(err);
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
	.pipe(notify({ message: 'Styles task completed', onLast: true }));
});
 
// Scripts
gulp.task('scripts', function() {
	return gulp.src([
		'src/js/global.js'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			console.log(err);
			notify.onError({
				message: 'Error in scripts task: <%= error.message %>'
			})(err);
			this.emit('end');
		}
	}))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest('public/js'))
	.pipe(notify({ message: 'Scripts task completed' }));
});
 
// Watch - watcher for changes in scss and js files: 'gulp watch' will run these tasks
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('src/sass/**/*.scss', ['styles']);
 
	// Watch .js files
	gulp.watch('src/js/global.js', ['scripts']);
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
			console.log(err);
			notify.onError({
				message: 'Error in vendor-scripts task: <%= error.message %>'
			})(err);
			this.emit('end');
		}
	}))
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('scripts'))
	.pipe(notify({ message: 'Vendor-scripts task completed' }));
});
*/

// Default - runs the scripts, styles and watch tasks: 'gulp' will run this task
gulp.task('default', ['scripts', 'styles', 'watch'])


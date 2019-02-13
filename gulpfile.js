"use-strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
// Sourcemaps seem to only work through gulp-sourcemaps currently, not the built in option.
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

/**
 * Lazy load in pacakges if they're used.
 * @param {*} packageName Name of the package.
 * @param {*} params Any special params the package is being required in with.
 */
var lazyLoadPackage = function(packageName, params) {
    let package = null;

    return function() {
        if (package === null) {
            if (typeof params === 'undefined') {
                package = require(packageName);
            } else {
                package = require(packageName)(params);
            }
        }

        return package;
    };
};

var fs = lazyLoadPackage('fs');
var player = lazyLoadPackage('play-sound', { player: 'mpv' });
var notifier = lazyLoadPackage('node-notifier');
var blessed = lazyLoadPackage('blessed');
var tail = lazyLoadPackage('tail');
var nodemon = lazyLoadPackage('nodemon');

var tsProject = ts.createProject('tsconfig.json');

/**
 * Should be set to true if the special graphicical CLI is used.
 */
var graphicalCliEnabled = false;
var gulpBox;
var stylesBox;
var scriptsBox;
var logBox;
var screen;

/**
 * Notify the user that any tasks have completed.
 * It makes sure that only one notification will be given rather than sending lots at the same time.
 */
var note = function() {
    var timer = null;
    var messages = null;

    var resetMessages = function() {
        messages = {
            info: '',
            error: ''
        };
    };

    var playSound = (soundName) => {
        player().play(__dirname + '\\gulp\\' + soundName, (err) => {
            if (err) throw err
        });
    };

    resetMessages();

    return function(type, message) {
        if (!graphicalCliEnabled) {
            // Return for Docker (or it will crash!)
            return;
        }

        clearTimeout(timer);

        messages[type] += '\n' + message;

        timer = setTimeout(function() {
            if (messages.info !== '') {
                notifier().notify({
                    title: 'Tasks ran:',
                    message: messages.info,
                    icon: __dirname + '\\gulp\\gulp-logo-blue.png',
                    sound: false,
                    //sound: __dirname + '\\gulp\\yeah.wav',
                    type: 'info'
                });

                playSound('yeah.wav');
            }

            if (messages.error !== '') {
                notifier().notify({
                    title: 'Tasks errored:',
                    message: messages.error,
                    icon: __dirname + '\\gulp\\gulp-logo-red.png',
                    sound: false,
                    //sound: __dirname + '\\gulp\\ugg.wav',
                    type: 'error'
                });

                playSound('ugg.wav');
            }

            resetMessages();
        }, 1000);
    };
}();

/**
 * Change a date to a string to be pretty printed.
 * @param {Date} d Date which should be made pretty.
 * @returns {String} A string that can be printed to Blessed.
 */
var formatDate = function(d) {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var time = '';

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    time = hours + ':' + minutes + ':' + seconds;

    return '[{yellow-fg}' + time + '{/yellow-fg}] ';
};

/**
 * Run the graphical CLI for development.
 * @param {Function} cb Callback that is run after the task is complete (notifies Gulp that the task is complete).
 */
var graphicalCliTask = (cb) => {
    let tailer = tail().Tail;

    if (!fs().existsSync('logs/log.txt')) {
        if (!fs().existsSync('logs')) {
            fs().mkdirSync('logs');
        }

        fs().writeFileSync('logs/log.txt', '');
    }

    new tailer('logs/log.txt', { separator: '\n', useWatchFile: true })
        .on('line', function(data) {
            var json = JSON.parse(data);

            logBox.pushLine(formatDate(json.time) + json.msg);
            screen.render();
        });

    screen = blessed().screen({
        smartCSR: true,
        resizeTimeout: 300,
        title: 'Gulp!'
    });

    gulpBox = blessed().log({
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

    stylesBox = blessed().log({
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

    scriptsBox = blessed().log({
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

    logBox = blessed().log({
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

    /*
        // Quit on Escape, q, or Control-C.
        screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return screen.destroy();
        });
    */

    // Render the screen.
    screen.render();

    cb();
};

var stylesTask = function(source, taskName) {
    if (typeof source === 'undefined') {
        throw new error('Function incorrectly ran. source is required');
    }

    let task = gulp.src(source)
        .pipe(plumber({
            errorHandler: function (err) {
                if (graphicalCliEnabled) {
                    stylesBox.pushLine(formatDate(new Date()) + '{red-fg}' + err.message + '{/red-fg}');
                    screen.render();
                }

                note('error', 'Error in styles task.');

                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(cssnano({ zindex: false }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));

    if (graphicalCliEnabled) {
        stylesBox.pushLine(formatDate(new Date()) + taskName + ' task completed.');
        screen.render();
    }

    note('info', taskName + ' task completed.');

    return task;
};

/**
 * Compile Sass to CSS.
 */
var mainStylesTask = function() {
    return stylesTask(['src/sass/main.scss'], 'Styles');
};

/*
    var ampStylesTask = function() {
        return stylesTask(['src/ampSass/amp.scss'], 'AMP styles');
    };
*/

/**
 * Compile front end scripts.
 */
var scriptsTask = function() {
    let task = gulp.src([ 'src/js/script.js' ])
        .pipe(plumber({
            errorHandler: function (err) {
                if (graphicalCliEnabled) {
                    scriptsBox.pushLine(formatDate(new Date()) + '{red-fg}' + err.message + '{/red-fg}');
                    screen.render();
                }

                note('error', 'Error in scripts task.');

                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));

    if (graphicalCliEnabled) {
        scriptsBox.pushLine(formatDate(new Date()) + 'Scripts task completed.');
        screen.render();
    }

    note('info', 'Scripts task completed.');

    return task;
};

/**
 * Compile TypeScript files.
 */
var typescriptTask = function() {
    let task = gulp.src([ 'server/src/**/*.ts' ])
        .pipe(plumber({
            errorHandler: function (err) {
                if (graphicalCliEnabled) {
                    scriptsBox.pushLine(formatDate(new Date()) + '{red-fg}' + err.message + '{/red-fg}');
                    screen.render();
                }

                note('error', 'Error in typescript task.');

                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('server/dist'));

    if (graphicalCliEnabled) {
        scriptsBox.pushLine(formatDate(new Date()) + 'Typescript task completed.');
        screen.render();
    }

    note('info', 'Typescript task completed.');

    return task;
};

/**
 * Run the server for development.
 * @param {Function} cb Callback that is run after the task is complete (notifies Gulp that the task is complete).
 */
var serverTask = function(cb) {
    if (!fs().existsSync('logs')) {
        fs().mkdirSync('logs');
    }

    nodemon()({
        script: 'server.js',
        ext: 'js',
        stdout: false,
        watch: ['server/dist/**/*.js', 'server.js', 'server/config.json'],
        // Not too sure if this does anything.
        inspect: "server/dist"
    })
    .on('start', function(event) {
        if (graphicalCliEnabled) {
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
        if (graphicalCliEnabled) {
            gulpBox.pushLine(formatDate(new Date()) + '{red-fg}Server crashed!{/red-fg}');
            screen.render();
        }

        note('error', 'Server crashed.');
    })
    .on('readable', function() {
        this.stdout.pipe(fs().createWriteStream('logs/nodemon-output.txt'));
        this.stderr.pipe(fs().createWriteStream('logs/nodemon-err.txt'));
    });

    cb();
};

/**
 * Watch for changes in the files.
 */
var watchTask = function() {
    gulp.watch('src/sass/**/*.scss', mainStylesTask);

    //gulp.watch('src/ampsass/**/*.scss', ampStyles);

    gulp.watch('src/js/script.js', scriptsTask);

    gulp.watch('server/src/**/*.ts', typescriptTask);
};

var build = gulp.parallel(mainStylesTask, scriptsTask, typescriptTask);

var buildAndWatch = gulp.series(
    gulp.parallel(mainStylesTask, scriptsTask, typescriptTask, serverTask),
    watchTask
);

exports.build = build;
exports.watch = watchTask;
exports.server = serverTask;

exports.default = gulp.series(
    function(cb) {
        graphicalCliEnabled = true;

        cb();
    },
    graphicalCliTask,
    buildAndWatch
);

exports.docker = buildAndWatch;

// Load plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var through2 = require('through2');
var wait = require('gulp-wait');
var player;
var notifier;
var blessed;
var fs;
var tail;
var nodemon;

var cli = false;
var gulpBox;
var stylesBox;
var scriptsBox;
var logBox;
var screen;

/**
 * Notify the user that any tasks have completed.
 * It makes sure that only one notification will be given rather than sending lots at the same time.
 * @returns
 */
var note = function() {
    notifier = require('node-notifier');
    player = require('play-sound')(opts = { player: 'mpv' });

    var timer = null;
    var messages = null;

    var resetMessages = function() {
        messages = {
            info: '',
            error: ''
        };
    };

    var playSound = (soundName) => {
        player.play(__dirname + '\\gulp\\' + soundName, (err) => {
            if (err) throw err
        });
    };

    resetMessages();

    return function(type, message) {
        clearTimeout(timer);

        messages[type] += '\n' + message;

        timer = setTimeout(function() {
            if (messages.info !== '') {
                notifier.notify({
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
                notifier.notify({
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

gulp.task('cli', function() {
    blessed = require('blessed');
    tail = require('tail').Tail;
    fs = require('fs');

    cli = true;

    if (!fs.existsSync('logs/log.txt')) {
        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs');
        }

        fs.writeFileSync('logs/log.txt', '');
    }

    new tail('logs/log.txt', { separator: '\n', useWatchFile: true })
        .on('line', function(data) {
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

var styles = function(source, taskName) {
    // Stop the through2 from getting run twice... A bit hacky.
    let first = true;

    return gulp.src(source)
        // Hack for Visual Studio Code locking up the file https://github.com/dlmanning/gulp-sass/issues/543
        .pipe(wait(500))
        .pipe(plumber({
            errorHandler: function (err) {
                if (cli) {
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
        .pipe(sourcemaps.write('.')) // For some reason this has to go at the end or through2 will occur twice.
        .pipe(gulp.dest('public/css'))
        .pipe(through2.obj((file, enc, callback) => {
            if (!first) {
                return;
            }

            first = false;

            if (cli) {
                stylesBox.pushLine(formatDate(new Date()) + taskName + ' task completed.');
                screen.render();
            }

            note('info', taskName + ' task completed.');

            callback(null, file);
        }));
};


// Styles - compile custom Sass
gulp.task('styles', function() {
    styles(['src/sass/main.scss'], 'Styles');
});

gulp.task('amp-styles', function() {
    styles(['src/ampSass/amp.scss'], 'AMP styles');
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

            note('error', 'Error in scripts task.');

            this.emit('end');
        }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(through2.obj(function(file, enc, callback) {
        if (cli) {
            scriptsBox.pushLine(formatDate(new Date()) + 'Scripts task completed.');
            screen.render();
        }

        note('info', 'Scripts task completed.');

        callback(null, file);
    }));
});

// Start - starts the server and restarts it on file change
gulp.task('start', function() {
    nodemon = require('nodemon');

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

        note('error', 'Server crashed.');
    })
    .on('readable', function() {
        this.stdout.pipe(fs.createWriteStream('logs/nodemon-output.txt'));
        this.stderr.pipe(fs.createWriteStream('logs/nodemon-err.txt'));
    });
});

// Watch - watcher for changes in scss and js files: 'gulp watch' will run these tasks
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/sass/**/*.scss', ['styles']);

    gulp.watch('src/ampsass/**/*.scss', ['amp-styles']);

    // Watch .js files
    gulp.watch('src/js/script.js', ['scripts']);
});

// Default - runs the scripts, styles and watch tasks: 'gulp' will run this task
gulp.task('default', ['cli', 'styles', 'amp-styles', 'scripts', 'start', 'watch'])

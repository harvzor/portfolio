module.exports = function(grunt) {
	// Initiate grunt config
	grunt.initConfig({
		// Read dependacies
		pkg: grunt.file.readJSON('package.json'),

		// Watch for changes in css and js
		watch: {
			grunt: {
				files: ['gruntfile.js']
			},
			css: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass']
			},
			uglify: {
				files: [
					'src/js/*.js',
					'src/js/libs/*.js'
				],
				tasks: ['uglify']
			},
			compress: {
				files: ['src/js/compiled/*.js'],
				tasks: ['concat']
			}
		},
		// Compile SASS
		sass: {
			dist: {
				options: { 
					style: 'compressed'
				},
				files: {
					'public/css/main.css' : 'src/sass/main.scss'
				}
			}
		},
		// Uglify JS
		uglify: {
			options: {
			  mangle: true
			},
			dist: { 
				src: [
					'src/js/*.js',
					'src/js/libs/*.js',
				],
				dest: 'src/js/compiled/',
				expand: true,
				flatten: true,
				ext: '.min.js'
			},
		},
		// Concat uglified JS
		concat: {
            dist: {
				src: ['src/js/compiled/*.min.js',],
				dest: 'public/js/compiled.min.js'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['sass', 'uglify', 'concat', 'watch'])
}

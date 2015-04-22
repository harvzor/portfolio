module.exports = function(grunt) {
	// Initiate grunt config
	grunt.initConfig({
		//read dependacies
		pkg: grunt.file.readJSON('package.json'),

		//Watch for changes in css and js
		watch: {
			grunt: {
				files: ['gruntfile.js']
			},
			css: {
				files: ['Sass/*.scss', 'Sass/*/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['../Js/script.js'],
				tasks: ['uglify']
			},
			/*
			express: {
				files:  ['server.js'],
				tasks:  ['express:live'],
				options: {
					spawn: false
				}
			}
			*/
		},
		//Compile SASS
		sass: {
			dist: {
				options: { 
					style: 'compressed'
				},
				files: {
					'public/css/main.css' : 'sass/main.scss'
				}
			}
		},
		//Minify JS
		uglify: {
			options: {
			  mangle: true
			},
			files: { 
				src: ['public/js/script.js'],
				dest: 'public/js/compiled',
				expand: true,
				flatten: true,
				ext: '.min.js'
			},
		},
		// Run server
		/*
		express: {
			live: {
				options: {
					script: 'server.js'
				}
			}
		}
		*/
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-express-server');

	//grunt.registerTask('default', ['sass', 'uglify', 'express', 'watch'])
	grunt.registerTask('default', ['sass', 'uglify', 'watch'])
}

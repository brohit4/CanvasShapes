module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			build: {
				files: [
			        {
			          expand: true, 
			          cwd: 'scripts/src',
			          src: ['**/*.js'],
			          dest: 'scripts/min',
			          ext: '.min.js'
			        }
			    ]
			}
		},
		jsdoc: {
	        dist: {
	            src: ['scripts/src/*.js'], 
	            options: {
	                destination: 'doc'
	            }
	        }
	    },
	    jshint: {
	    	src: ['scripts/src/*.js']
	    },
	    concat: {
	    	app1: {
		    	src: ['scripts/min/CanvasShapes.min.js','scripts/min/appscript_1.min.js'],
			    dest: 'scripts/deploy/appscript_1.js'
			},
			app2: {
				src: ['scripts/min/CanvasShapes.min.js','scripts/min/appscript_2.min.js'],
			    dest: 'scripts/deploy/appscript_2.js'
			}
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	/**this should be the order in which default tasks should run
	*Make sure when new task is added, it is added at the right place
	*/
	grunt.registerTask('default',['jshint', 'jsdoc', 'uglify', 'concat']);
}
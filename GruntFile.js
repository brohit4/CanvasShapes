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
	    	files: {
	    		src: ['scripts/min/*.js', '!scripts/min/class.min.js', 'scripts/min/class.min.js'],
		    	dest: 'scripts/deploy/script.js'
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
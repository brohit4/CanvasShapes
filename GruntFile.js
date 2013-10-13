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
	    	//With increasing number of apps..the atargets need to be generated dynamically  
	    	app1: {
		    	src: ['scripts/min/CanvasShapes.min.js','scripts/min/appscript_1.min.js'],
			    dest: 'scripts/deploy/appscript_1.js'
			},
			app2:{
				src: ['scripts/min/CanvasShapes.min.js','scripts/min/appscript_2.min.js'],
			    dest: 'scripts/deploy/appscript_2.js'
			}
	    },
	    jasmine: {
	    	//With increasing number of apps..the atargets need to be generated dynamically
	    	test1: {
	    		src: 'scripts/src/CanvasShapes.js',
		    	options: {
		    		specs: 'tests/test1.js',
		    		keepRunner: true
		    	}
	    	},
	    	test2: {
	    		src: 'scripts/src/CanvasShapes.js',
		    	options: {
		    		specs: 'tests/test2.js',
		    		keepRunner: true
		    	}
	    	},
	    	test3: {
	    		src: 'scripts/src/CanvasShapes.js',
		    	options: {
		    		specs: 'tests/test3.js',
		    		keepRunner: true
		    	}
	    	},
	    	test4: {
	    		src: 'scripts/src/CanvasShapes.js',
		    	options: {
		    		specs: 'tests/test4.js',
		    		keepRunner: true
		    	}
	    	}
	    	
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	/**this should be the order in which default tasks should run
	*Make sure when new task is added, it is added at the right place
	*/
	grunt.registerTask('default',['jshint', 'jsdoc', 'uglify', 'concat', 'jasmine']);
}
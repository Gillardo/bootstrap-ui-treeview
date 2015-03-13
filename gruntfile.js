/// <vs AfterBuild='default' />
module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '// <%= pkg.url %>\n// Version: <%= pkg.version %>\n// Released: <%= grunt.template.today("yyyy-mm-dd") %> \n'
            },
            app: {
                src: [
                    'tree-view-service.js',
                    'tree-view-directive.js',
                ],
                dest: 'dist/tree-view.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'dist/tree-view.js',
                dest: 'dist/tree-view.min.js'
            }
        }

    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // Default task
    grunt.registerTask('default', ['concat', 'uglify']);
};
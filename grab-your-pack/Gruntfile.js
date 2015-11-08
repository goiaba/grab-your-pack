module.exports = (function () {
     
    'use strict';
       
    return function (grunt) {
             
        //Load all the grunt tasks.
        require('load-grunt-tasks')(grunt);

        var config = {
            src: 'src',                                 // working directory
            tests: 'tests',                             // unit tests folder
            dist: 'cordova',                            // distribution folder
            supported: ['ios', 'android'],              // supported platforms
            platform: grunt.option('platform') || 'android' // current target platform
        };
     
        grunt.initConfig({
            config: config,
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                gruntfile: 'Gruntfile.js',
                src: ['<%= config.src %>/js/**/*.js', '!<%= config.src %>/js/templates.js']
            },
            // Empty the 'www' folder.
            clean: {
                options: {
                    force: true
                },
                dist: ['<%= config.dist %>/www']
            },
            handlebars: {
                compile: {
                    options: {
                        amd: true,
                        processName: function (filepath) {
                            var pieces = filepath.split('/');
                            return pieces[pieces.length - 1].split('.')[0];
                        }
                    },
                    src: ['<%= config.src %>/templates/{,*/}*.html'],
                    dest: '<%= config.src %>/js/templates.js'
                }
            },
            // Optimize the javascript files using r.js tool.
            requirejs: {
                compile: {
                    options: {
                        baseUrl: '<%= config.src %>/js',
                        mainConfigFile: '<%= config.src %>/js/main.js',
                        almond: true,
                        include: ['main'],
                        out: '<%= config.dist %>/www/js/grab-your-pack.min.js',
                        optimize: 'uglify'
                    }
                }
            },
            // Optimize the CSS files.
            cssmin: {
                compile: {
                    files: {
                        '<%= config.dist %>/www/css/grab-your-pack.min.css': [
                            '<%= config.src %>/css/grab-your-pack.css',
                            '<%= config.src %>/css/grab-your-pack.<%= config.platform %>.css'                            
                        ]
                    }
                }
            },

            // Change the script and css references to optimized ones.
            processhtml: {
                dist: {
                    files: {
                        '<%= config.dist %>/www/index.html': [
                            '<%= config.src %>/index.<%= config.platform %>.html'
                        ]
                    }
                }
            },

            // Copy the static resources like images to the platform specific folder.
            copy: {
                config: {
                    expand: true,
                    dot: true,
                    src: 'config.xml',
                    dest: '<%= config.dist %>'
                },
                img: {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>/img',
                    dest: '<%= config.dist %>/www/img',
                    src: ['{,*/}*.*']
                }
            },

            connect: {
                options: {
                    hostname: 'localhost',
                    open: true,
                    livereload: true
                },
                app: {
                    options: {
                        middleware: function (connect) {
                            return [
                                connect.static(config.src),
                                connect().use('/bower_components', connect.static('./bower_components'))
                            ];
                        },
                        port: 9000,
                        open: {
                            target: 'http://localhost:9000/index.<%= config.platform %>.html'
                        }
                    }
                }
            },
            watch: {
                // Watch grunt file.
                gruntfile: {
                    files: ['Gruntfile.js'],
                    tasks: ['jshint:gruntfile']
                },

                // Watch javascript files.
                js: {
                    files: [
                        '<%= config.src %>/js/**/*.js',
                        '!<%= config.src %>/js/templates.js'
                    ],
                    tasks: ['jshint:src'],
                    options: {
                        livereload: true
                    }
                },

                // Watch handlebar templates.
                handlebars: {
                    files: [
                        '<%= config.src %>/templates/{,*/}*.html'
                    ],
                    tasks: ['handlebars'],
                    options: {
                        livereload: true
                    }
                },

                // Watch html and css files.
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= config.src %>/index.<%= config.platform %>.html',
                        '<%= config.src %>/css/grab-your-pack.css',
                        '<%= config.src %>/css/grab-your-pack.<%= config.platform %>.css'
                    ]
                }
            },
            // Task to install platforms and plugins and to build, emulate and deploy the app.
            cordovacli: {
                options: {
                    path: './<%= config.dist %>'
                },
                install: {
                    options: {
                        command: ['create', 'platform', 'plugin'],
                        platforms: '<%= config.supported %>',
                        plugins: [
                            'file',
                            'dialogs'
                        ],
                        name: 'grabYourPack'
                    }
                },
                build: {
                    options: {
                        command: 'build',
                        platforms: ['<%= config.platform %>']
                    }
                },
                emulate: {
                    options: {
                        command: 'emulate',
                        platforms: ['<%= config.platform %>']
                    }
                },
                deploy: {
                    options: {
                        command: 'run',
                        platforms: ['<%= config.platform %>']
                    }
                }
            }
        });

        // Build the web resources.
        grunt.registerTask('buildweb', [
            'jshint',
            'clean',
            'handlebars',
            'requirejs',
            'cssmin',
            'processhtml',
            'copy'
        ]);

        // Create cordova project, add platforms and plugins.
        grunt.registerTask('create', [
            'cordovacli:install'
        ]);

        // Build the app.
        grunt.registerTask('build', [
            'buildweb',
            'cordovacli:build'
        ]);

        // Run the app in emulator.
        grunt.registerTask('emulate', [
            'buildweb',
            'cordovacli:emulate'
        ]);

        // Deploy the app in device.
        grunt.registerTask('deploy', [
            'buildweb',
            'cordovacli:deploy'
        ]);

        grunt.registerTask('serve', [
            'jshint:src',
            'handlebars',
            'connect',
            'watch'
        ]);

        // Start the server with distribution code.
        grunt.registerTask('dist', [
            'buildweb',
            'connect:dist'
        ]);

        // Default task.
        grunt.registerTask('default', [
            'serve'
        ]);

    };
})();

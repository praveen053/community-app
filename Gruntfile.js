
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Project settings
    mifosx: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      target: 'community-app',
      test: 'test'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        node: true,
        jshintrc: true,
        reporter:'checkstyle',
        reporterOutput:'jshint-log.xml'
      },
      all: ['Gruntfile.js', '<%= mifosx.app %>/scripts/**/*.js']
    },

    karma: {
      unit: {
          configFile: 'karma.conf.js'
      }
    },

    //uglify the js files
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      prod: {
        files: [{'<%= mifosx.dist %>/<%=mifosx.target%>/bower_components/angular-mocks/angular-mocks.min.js'
          :['<%= mifosx.app %>/bower_components/angular-mocks/angular-mocks.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/bower_components/angular-webstorage/angular-webstorage.min.js'
          :['<%= mifosx.app %>/bower_components/angular-webstorage/angular-webstorage.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/bower_components/ckeditor/ckeditor.min.js'
          :['<%= mifosx.app %>/bower_components/ckeditor/ckeditor.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/bower_components/datatables/media/js/jquery.dataTables.min.js'
          :['<%= mifosx.app %>/bower_components/datatables/media/js/jquery.dataTables.js'],
          //'<%= mifosx.dist %>/<%=mifosx.target%>/bower_components/require-css/css.min.js'
          //:['<%= mifosx.app %>/bower_components/require-css/css.js'],
          //'<%= mifosx.dist %>/<%=mifosx.target%>/bower_components/requirejs/requirejs.min.js'
          //:['<%= mifosx.app %>/bower_components/requirejs/require.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/bower_components/underscore/underscore.min.js'
          :['<%= mifosx.app %>/bower_components/underscore/underscore.js']
        }]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= mifosx.dist %>/*',
            '!<%= mifosx.dist %>/.git*'
          ]
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      prod: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= mifosx.app %>',
          dest: '<%= mifosx.dist %>/<%=mifosx.target%>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp}',
            'fonts/*',
            'images/*',
            'scripts/*.js',
            'scripts/services/*.js',
            'scripts/modules/*.js',
            '!scripts/routes.js',
            '!scripts/initialTasks.js',
            '!scripts/webstorage-configuration.js',
            '!scripts/mifosXComponents.js',
            '!scripts/mifosXComponents-build.js',
            '!scripts/loader.js',
            '!scripts/loader-build.js',
            'styles/*.css',
            '!scripts/mifosXStyles.js',
            '!scripts/mifosXStyles-build.js',
            'global-translations/**',
            '*.html',
            'views/**'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= mifosx.test %>',
          dest: '<%= mifosx.dist %>/<%=mifosx.target%>/test',
          src: [
            '**/**'
          ]
        },
        {
          '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/mifosXComponents.js':['<%= mifosx.app %>/scripts/mifosXComponents-build.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/loader.js':['<%= mifosx.app %>/scripts/loader-build.js'],
          '<%=mifosx.dist %>/<%=mifosx.target%>/scripts/mifosXStyles.js':['<%=mifosx.app%>/scripts/mifosXStyles-build.js']
          //'<%= mifosx.dist %>/<%=mifosx.target%>':['<%= mifosx.test %>/**']
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= mifosx.app %>/bower_components',
          dest: '<%= mifosx.dist %>/<%=mifosx.target%>/bower_components',
          src: [
            '**/*min.js', 'require-css/*.js', 'require-less/*.js', 
            '!jasmine/**', '!requirejs/**/**', 'requirejs/require.js', '!underscore/**'
          ]
        }
        ]
      },
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= mifosx.app %>',
          dest: '<%= mifosx.dist %>/<%=mifosx.target%>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp}',
            'fonts/*',
            'scripts/**/*.js',
            'global-translations/**',
            'styles/**',
            '*.html',
            'views/**',
            'images/**',
            'bower_components/**'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= mifosx.test %>',
          dest: '<%= mifosx.dist %>/<%=mifosx.target%>/test',
          src: [
            '**/**'
          ]
        }]
      }
    },

      //hashing css & js
      hashres: {
          options: {
              encoding: 'utf8',
              fileNameFormat: '${name}.${hash}.${ext}',
              renameFiles: true
          },
          css: {
              options: {
              },
              dest: '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/mifosXStyles.js',
              src: ['<%= mifosx.dist %>/<%=mifosx.target%>/styles/*.css','!<%= mifosx.dist %>/<%=mifosx.target%>/styles/font-awesome.min.css']
          },
          js: {
              options: {
              },
              dest: ['<%= mifosx.dist %>/<%=mifosx.target%>/scripts/mifosXComponents.js'],
              src:  [
                      '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/directives/directives.js',
                      '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/routes-initialTasks-webstorage-configuration.js',
                      '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/controllers/controllers.js',
                      '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/filters/filters.js',
                      '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/models/models.js'
              ]
          },
          ext : {
              options: {},
              dest: '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/loader.js',
              src:   ['<%= mifosx.dist %>/<%=mifosx.target%>/scripts/mifosXComponents.js','<%= mifosx.dist %>/<%=mifosx.target%>/scripts/mifosXStyles.js']
          },
          loader : {
              options: {},
              src: '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/loader.js',
              dest: '<%= mifosx.dist %>/<%=mifosx.target%>/index.html'
          }
      },

    // rename files
      replace: {
          text: {
              src: ['<%= mifosx.dist %>/<%=mifosx.target%>/scripts/mifosXComponents*','<%= mifosx.dist %>/<%=mifosx.target%>/scripts/loader*'],
              overwrite: true,
              replacements: [{
                  from: '.js',
                  to: ''
              }]
          }
      },
    
    // concatinate JS files
    /** FIXME: Address issues with this task**/
    concat: {
      options: {
        separator: ';'
      },
      //
      dist: {
        files: {
          '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/controllers/controllers.js': ['<%= mifosx.app %>/scripts/controllers/**/*.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/directives/directives.js': ['<%= mifosx.app %>/scripts/directives/**/*.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/models/models.js': ['<%= mifosx.app %>/scripts/models/**/*.js'],
          //'<%= mifosx.dist %>/<%=mifosx.target%>/scripts/services/services.js': ['<%= mifosx.app %>/scripts/services/**/*.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/filters/filters.js': ['<%= mifosx.app %>/scripts/filters/**/*.js'],
          '<%= mifosx.dist %>/<%=mifosx.target%>/scripts/routes-initialTasks-webstorage-configuration.js':
            ['<%= mifosx.app %>/scripts/routes.js', 
            '<%= mifosx.app %>/scripts/initialTasks.js', 
            '<%= mifosx.app %>/scripts/webstorage-configuration.js']
        }
      }
    },
    //FIXME: Address issues with requirejs task
    requirejs: {
      compile: {
        options: {
          baseUrl: '<%= mifosx.app %>',
          mainConfigFile: '<%= mifosx.app %>/scripts/loader.js',
          out: '<%= mifosx.dist %>/<%=mifosx.target%>/loader.js'
        }
      }
    },

    devcode: {
      options: {
        html: true,        // html files parsing?
        js: true,          // javascript files parsing?
        css: false,         // css files parsing?
        clean: true,       // removes devcode comments even if code was not removed
        block: {
          open: 'devcode', // with this string we open a block of code
          close: 'endcode' // with this string we close a block of code
        },
        dest: 'dist'       // default destination which overwrittes environment variable
      },
      dist : {             // settings for task used with 'devcode:dist'
        options: {
            source: 'dist/',
            dest: 'dist/',
            env: 'production'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-devcode');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-text-replace');
  // Default task(s).
      
  grunt.registerTask('default', ['clean', 'jshint', 'copy:dev']);
  grunt.registerTask('prod', ['clean', 'copy:prod', 'concat', 'uglify:prod', 'devcode:dist', 'hashres','replace']);
  grunt.registerTask('dev', ['clean', 'copy:dev']);
  grunt.registerTask('compile', ['jshint']);
  grunt.registerTask('test', ['karma']);

};
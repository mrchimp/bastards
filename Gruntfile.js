module.exports = function(grunt) {

  var js_files = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-mousewheel/jquery.mousewheel.js',
    'bower_components/easeljs/lib/easeljs-0.8.0.combined.js',
    'bower_components/createjs-tweenjs/lib/tweenjs-0.6.0.combined.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/jquery-knob/js/jquery.knob.js',
    'js/btp/Rand.js',
    'js/btp/Ship.js',
    'js/btp/CrewMember.js',
    'js/btp/ShipSection.js',
    'js/btp/Game.js',
    'js/btp/Weapon.js',
    'js/btp/Main.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        sourceMap: true,
      },
      dist: {
        src: js_files,
        dest: 'js/production.js',
        nonull: true
      },
      dev: {
        src: js_files,
        dest: 'js/production.min.js',
        nonull: true
      }
    },
    uglify: {
      build: {
        src: 'js/production.js',
        dest: 'js/production.min.js'
      }
    },
    less: {
      dev: {
        options: {
          paths: ['css'],
          cleancss: true
        },
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },
    jshint: {
      files: 'js/btp/**/*.js'
    },
    focus: {
      all: {}
    },
    watch: {
      js: {
        files: js_files,
        tasks: ['concat:dev', 'jshint'],
        options: {
          nospawn: true
        }
      },
      less: {
        files: ['less/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-focus');

  grunt.registerTask('default', ['concat:dev', 'less', 'jshint']);
  grunt.registerTask('dist', ['concat', 'uglify', 'less', 'jshint']);
  grunt.registerTask('watch-all', ['focus']);

};
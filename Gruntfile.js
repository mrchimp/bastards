module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'js/kinetic-v4.7.4.min.js',
          'js/mustache.js',
          'packages/jquery-knob/js/jquery.knob.js',
          'js/mustache.js',
          'js/btp/Rand.js',
          'js/btp/Ship.js',
          'js/btp/CrewMember.js',
          'js/btp/ShipSection.js',
          'js/btp/Game.js',
          'js/btp/Weapon.js',
          'js/btp/Interface.js'
        ],
        dest: 'js/production.js'
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
          'css/style.css': 'css/style.less'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['concat', 'uglify', 'less']);

};
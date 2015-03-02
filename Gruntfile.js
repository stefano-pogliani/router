module.exports = function(grunt) {
  grunt.initConfig({
    chmod: {
      options: { mode: "755" },
      dist:    { src: ["dist/**"] }
    },

    compress: {
      options: {
        archive: "dist.tar.gz",
        mode:    "tgz"
      },

      dist: { files: [{
        expand: true,
        cwd:    "dist/",
        dest:   "router-bootstrap",
        src:    ["**"]
      }] }
    },

    copy: {
      dist: {
        expand: true,
        cwd:    "scripts/",
        src:    "**",
        dest:   "dist/"
      }
    },

    templetise: {
      options: {
        plugins_dir: "templates/plugins"
      },

      dist: [
        // Additional package installer.
        {
          dest:     "dist/install-boot-packages",
          src:      "data/boot-packages.json",
          template: "install-packages",
          type:     "file"
        }
      ]
    }
  });

  // Load other tasks.
  grunt.loadNpmTasks("grunt-chmod");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("templetise");

  // Define default task.
  grunt.registerTask("default", [
    "copy:dist",
    "templetise:dist",
    "chmod:dist",
    // copy data
    "compress:dist"
  ]);
};


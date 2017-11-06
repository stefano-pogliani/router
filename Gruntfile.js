module.exports = function(grunt) {

  grunt.initConfig({
    chmod: {
      options: { mode: "755" },
      dist:    { src: ["dist/*", "!dist/*.*"] }
    },

    clean: {
      dist: ["dist/", "dist.tar.gz"]
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
      data: {
        expand: true,
        cwd:    "data/",
        src:    ["**", "!**/*.json", "!modes/**"],
        dest:   "dist/"
      },

      priv: {
        dest:   "dist/",
        expand: true,
        src:    "priv/**"
      },

      scripts: {
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

      common: [{ // Additional boot packages installer.
        dest:     "dist/install-boot-packages",
        src:      "data/boot-packages.json",
        template: "install-packages",
        type:     "file"
      }, { // Additional packages installer.
        dest:     "dist/install-packages",
        src:      "data/packages.json",
        template: "install-packages",
        type:     "file"
      }, { // Disable services.
        dest:     "dist/disable-services",
        src:      "data/disable-services.json",
        template: "disable-services",
        type:     "file"
      }, { // Users.
        dest:     "dist/users",
        src:      "data/users.json",
        template: "users",
        type:     "file"
      }],

      debug: [{ // Configuration constants.
        dest:     "dist/shared/config.inc",
        src:      "data/modes/debug/config.json",
        template: "config",
        type:     "file"
      }, { // DHCP and DNS.
        dest:     "dist/configure-dhcp-dns",
        src:      "data/modes/debug/dhcp-dns.json",
        template: "configure-dhcp-dns",
        type:     "file"
      }, { // Firewall rules.
        dest:     "dist/firewall",
        src:      "data/modes/debug/firewall.json",
        template: "firewall",
        type:     "file"
      }],

      dist: [{ // Configuration constants.
        dest:     "dist/shared/config.inc",
        src:      "data/modes/dist/config.json",
        template: "config",
        type:     "file"
      }, { // DHCP and DNS.
        dest:     "dist/configure-dhcp-dns",
        src:      "data/modes/dist/dhcp-dns.json",
        template: "configure-dhcp-dns",
        type:     "file"
      }, { // Firewall rules.
        dest:     "dist/firewall",
        src:      "data/modes/dist/firewall.json",
        template: "firewall",
        type:     "file"
      }]
    }
  });

  // Load other tasks.
  grunt.loadNpmTasks("grunt-chmod");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("templetise");

  // Define build tasks.
  grunt.registerTask("dist", [
    "copy:data",
    "copy:scripts",
    "templetise:common",
    "templetise:dist",
    "chmod:dist",
    "compress:dist"
  ]);
  grunt.registerTask("debug", [
    "copy:data",
    "copy:priv",
    "copy:scripts",
    "templetise:common",
    "templetise:debug",
    "chmod:dist",
    "compress:dist"
  ]);

  // Alias default task.
  grunt.registerTask("default", "dist");
};


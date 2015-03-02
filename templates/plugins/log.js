module.exports = function(handlebars) {

  var make_log_fn = function make_log_fn(level, to_std_err) {
    return function log_fn(var_args) {
      var message = "[" + level + "] ";

      for (var idx = 0; idx < arguments.length - 2; idx++) {
        message += arguments[idx] + " ";
      }
      message += arguments[arguments.length - 2];

      if (to_std_err) {
        message += " > &2";
      }

      return new handlebars.SafeString("echo \"" + message + "\"");
    };
  };

  handlebars.registerHelper("error", make_log_fn("E", true));
  handlebars.registerHelper("info",  make_log_fn("I", false));
};

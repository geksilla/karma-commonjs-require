/**
  Config
    @param appDir {String} - application root directory name of this directory will be removed while create path to module
*/

var createCommonRequirePreprocessor = function(args, logger, config, basePath) {
  var log  = logger.create('preprocessor:common-require');
  var appDir = config.appDir || 'app';
  return function(content, file, done) {
    var processed = null;
    var modulePath = file.path.replace(basePath, '').replace(new RegExp("\/" + appDir + "\/"), "").replace(/^\//, '').replace(/\..+$/, '');
    log.debug('Processing %s register module "%s"', file.path, modulePath);
    try {
      processed = ";require.register(\""+ modulePath +"\", function(exports, require, module){\n" + content + "\n})";
    } catch (e) {
      log.errror("%s\n at %s", e.message, file.originalPath);
    }

    done(processed);
  }
};

createCommonRequirePreprocessor.$inject = ['args', 'logger', 'config.commonRequirePreprocessor', 'config.basePath']

module.exports = {
  'preprocessor:common-require': ['factory', createCommonRequirePreprocessor],
}
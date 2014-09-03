var path = require('path');

/**
  Config
    @param appDirs {Array} - application root directories
        those directories will be removed while creating path to module
*/

var createCommonRequirePreprocessor = function(args, logger, config, basePath) {
  var log     = logger.create('preprocessor:common-require');
  var appDirs = config.appDirs || ['app'];
  return function(content, file, done) {
    var processed  = null;
    var modulePath = generateModulePath(file.path, basePath, appDirs)
    log.debug('Processing %s register module "%s"', file.path, modulePath);
    try {
      processed = ";require.register(\""+ modulePath +"\", function(exports, require, module){\n" + content + "\n})";
    } catch (e) {
      log.errror("%s\n at %s", e.message, file.originalPath);
    }

    done(processed);
  }
};

var generateModulePath = function(filePath, basePath, appDirs){
  var res = filePath.replace(basePath, '')
  // will only remove one of appDirs strings,
  // since the starting "/"-char will be gone then
  for(i=0; i < appDirs.length; i++){
    res = res.replace(new RegExp("\/" + appDirs[i] + "\/"), "")
  }
  res = res.replace(/^\//, '').replace(/\..+$/, '');
  return res
}

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initCommonRequire = function(files) {
  files.unshift(createPattern(__dirname + '/node_modules/commonjs-require-definition/require.js'));
}


createCommonRequirePreprocessor.$inject = ['args', 'logger', 'config.commonRequirePreprocessor', 'config.basePath'];
initCommonRequire.$inject               = ['config.files'];

module.exports = {
  'framework:common-require':    ['factory', initCommonRequire],
  'preprocessor:common-require': ['factory', createCommonRequirePreprocessor]
}
'use strict';
var imageminWebp = require('imagemin-webp');
var modifyErrorEvent = require('modify-error-event');
var PluginError = require('gulp-util').PluginError;

module.exports = function (options) {
	return modifyErrorEvent(imageminWebp(options)(), function(err) {
		return new PluginError('gulp-webp', err, {fileName: err.fileName});
	});
};

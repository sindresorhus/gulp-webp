'use strict';
const imageminWebp = require('imagemin-webp');
const modifyErrorEvent = require('modify-error-event');
const PluginError = require('plugin-error');

module.exports = options => {
	return modifyErrorEvent(imageminWebp(options)(), err => {
		return new PluginError('gulp-webp', err, {fileName: err.fileName});
	});
};

'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var ExecBuffer = require('exec-buffer');
var webp = require('cwebp-bin').path;

module.exports = function (options) {
	options = options || {};

	var exec = new ExecBuffer();
	var args = ['-quiet'];

	if (options.quality) {
		args.push('-q', options.quality);
	}

	if (options.lossless) {
		args.push('-lossless');
	}

	return through.obj(function (file, enc, cb) {
		var ext = path.extname(file.path).slice(1).toLowerCase();

		if (file.isNull() || ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'webp'].indexOf(ext) === -1) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-webp', 'Streaming not supported'));
			return;
		}

		exec
			.use(webp, args.concat([exec.src(), '-o', exec.dest()]))
			.run(file.contents, function (err, buf) {
				if (err) {
					cb(new gutil.PluginError('gulp-webp', err, {fileName: file.path}));
					return;
				}

				file.contents = buf;
				file.path = gutil.replaceExtension(file.path, '.webp');
				cb(null, file);
			});
	});
};

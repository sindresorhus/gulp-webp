'use strict';
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var through = require('through2');
var concat = require('concat-stream');
var pause = require('pause-stream');

module.exports = function (options) {
	options = options || {};

	var args = ['-'];

	if (options.quality) {
		args.push('-quality', options.quality);
	}

	if (options.lossless) {
		args.push('-define', 'webp:lossless=' + options.lossless);
	}

	args.push('webp:-');

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-webp', 'Streaming not supported'));
			return;
		}

		var cp = spawn('convert', args);

		cp.stdout.pipe(concat(function (data) {
			if (file.isBuffer()) {
				file.contents = data;
			}

			if (file.isStream()) {
				file.contents = pause();
				file.contents.pause();
				file.contents.write(data);
			}

			file.contents = data;
			file.path = gutil.replaceExtension(file.path, '.webp');
			cb(null, file);
		}));

		cp.stderr.setEncoding('utf8');

		cp.stderr.on('data', function (str) {
			cb(new gutil.PluginError('gulp-webp', str, {fileName: file.path}));
		});

		if (file.isBuffer()) {
			cp.stdin.end(file.contents);
		}

		if (file.isStream()) {
			file.contents.pipe(cp.stdin);
		}
	});
};

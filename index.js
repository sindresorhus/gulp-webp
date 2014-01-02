'use strict';
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var map = require('map-stream');
var concat = require('concat-stream');
var pause = require('pause-stream');

module.exports = function (options) {
	options = options || {};

	var args = ['-'];

	if (options.quality) {
		args.push('-quality', options.quality);
	}

	if (options.lossless) {
		args.push('-define', 'webp:lossless=' + options.lossless)
	}

	args.push('webp:-');

	return map(function (file, cb) {
		if (file.isNull()) {
			return cb(null, file);
		}
		
		var cp = spawn('convert', args);
		cp.stdout.pipe(concat(function (data) {
			if (file.isBuffer()) {
				file.contents = data;
			}
			if (file.isStream()) {
				file.contents = pause()
				file.contents.pause();
				file.contents.write(data);
			}
			file.contents = data;
			file.path = gutil.replaceExtension(file.path, '.webp');
			cb(null, file);
		}));
		cp.stderr.on('data', function (data) {
			cb(new Error('gulp-webp: ' + data.toString()));
		});
		
		if (file.isBuffer()) {
			cp.stdin.end(file.contents);
		}
		if (file.isStream()) {
			file.contents.pipe(cp.stdin);
		}
	});
};

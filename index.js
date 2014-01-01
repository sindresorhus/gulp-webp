'use strict';
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var map = require('map-stream');
var concat = require('concat-stream');

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
		var cp = spawn('convert', args);
		cp.stdin.write(file.contents);
		cp.stdout.pipe(concat(function (data) {
			file.contents = data;
			file.path = gutil.replaceExtension(file.path, '.webp');
			cb(null, file);
		}));
		cp.stdin.end();
		cp.stderr.on('data', function (data) {
			cb(new Error('gulp-webp: ' + data.toString()));
		});
	});
};

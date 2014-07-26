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
		args.push('-define', 'webp:lossless=' + options.lossless)
	}

	args.push('webp:-');

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-webp', 'Streaming not supported'));
			return cb();
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
			this.push(file);
			cb();
		}.bind(this)));

		cp.stderr.on('data', function (data) {
			this.emit('error', new gutil.PluginError('gulp-webp', data.toString(), {fileName: file.path}));
			this.push(file);
			cb();
		}.bind(this));

		if (file.isBuffer()) {
			cp.stdin.end(file.contents);
		}

		if (file.isStream()) {
			file.contents.pipe(cp.stdin);
		}
	});
};

'use strict';
var assert = require('assert');
var path = require('path');
var File = require('vinyl');
var gutil = require('gulp-util');
var read = require('vinyl-file').read;
var webp = require('./');

it('should convert images to WebP', function (cb) {
	read(path.join(__dirname, 'fixture.jpg'), function(err, file) {
		assert.strictEqual(err, null);

		var stream = webp();
		var size = file.contents.length;

		stream.on('data', function (data) {
			assert(data.contents.length < size);
			assert.equal(data.path, path.join(__dirname, 'fixture.webp'));
		});

		stream.on('end', cb);

		stream.end(file);
	});
});

it('should not convert unsupported files', function (cb) {
	var stream = webp();

	stream.on('data', function (data) {
		assert.equal(String(data.contents), 'contents');
		cb();
	});

	stream.end(new File({
		contents: new Buffer('contents')
	}));
});

it('should emit a plugin error when the image is corrupt', function (cb) {
	var fileName = path.join(__dirname, 'fixture-corrupt.webp');

	read(fileName, function(err, file) {
		assert.strictEqual(err, null);

		var stream = webp();

		stream.on('error', function (err) {
			assert(err instanceof gutil.PluginError);
			assert(err.plugin, 'gulp-webp');
			assert.equal(err.fileName, fileName);
			cb();
		});

		stream.end(file);
	});
});

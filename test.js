'use strict';
var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var webp = require('./index');

it('should convert images to WebP', function (cb) {
	var LOSSY_SIZE = 20000;
	var stream = webp({lossless: true});

	stream.on('data', function (file) {
		assert(file.contents.length > LOSSY_SIZE);
		cb();
	});

	stream.write(new gutil.File({
		contents: fs.readFileSync('fixture.jpg')
	}));
});

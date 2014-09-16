'use strict';
var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var webp = require('./');

it('should convert images to WebP', function (cb) {
	var LOSSY_SIZE = 20000;
	var stream = webp({lossless: true});

	stream.once('data', function (file) {
		assert(file.contents.length > LOSSY_SIZE);
	});

	stream.on('end', cb);

	stream.write(new gutil.File({
		path: __dirname + '/fixture.png',
		contents: fs.readFileSync('fixture.jpg')
	}));

	stream.end();
});

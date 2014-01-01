# [gulp](https://github.com/wearefractal/gulp)-webp [![Build Status](https://secure.travis-ci.org/sindresorhus/gulp-webp.png?branch=master)](http://travis-ci.org/sindresorhus/gulp-webp)

> Convert images to [WebP](https://developers.google.com/speed/webp/)


## Prerequisites

Requires [imagemagick](http://www.imagemagick.org/script/binary-releases.php) to be installed and in your PATH.

- OS X: `brew install imagemagick --with-webp`


## Install

Install with [npm](https://npmjs.org/package/gulp-webp)

```
npm install --save-dev gulp-webp
```


## Example

```js
var gulp = require('gulp');
var webp = require('gulp-webp');

gulp.task('default', function () {
	gulp.src('src/image.jpg')
		.pipe(webp())
		.pipe(gulp.dest('dist'));
});
```


## API

### webp(options)

#### options

##### quality

Type: `Number`  
Default: `100`  
Min: `0`  
Max: `100`

##### lossless

Type: `Boolean`  
Default: `false`


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)

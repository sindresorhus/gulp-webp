# [gulp](http://gulpjs.com)-webp [![Build Status](https://travis-ci.org/sindresorhus/gulp-webp.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-webp)

> Convert images to [WebP](https://developers.google.com/speed/webp/)


## Prerequisites

Requires [imagemagick](http://www.imagemagick.org/script/binary-releases.php) to be installed and in your PATH.

- OS X: `brew install imagemagick --with-webp`

You can check whether your imagemagick install supports WebP by running: `identify -list format | grep webp`


## Install

```bash
$ npm install --save-dev gulp-webp
```


## Usage

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

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)

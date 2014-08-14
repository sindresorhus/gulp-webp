# [gulp](http://gulpjs.com)-webp

> Convert images to [WebP](https://developers.google.com/speed/webp/)


## Prerequisites

Requires [imagemagick](http://www.imagemagick.org/script/binary-releases.php) to be installed and in your PATH.

- OS X: `brew install imagemagick --with-webp`

You can check whether your imagemagick install supports WebP by running: `identify -list format | grep webp`


## Install

```sh
$ npm install --save-dev gulp-webp
```


## Usage

```js
var gulp = require('gulp');
var webp = require('gulp-webp');

gulp.task('default', function () {
	return gulp.src('src/image.jpg')
		.pipe(webp())
		.pipe(gulp.dest('dist'));
});
```


## API

### webp(options)

#### options

##### quality

Type: `number`  
Default: `100`  
Min: `0`  
Max: `100`

##### lossless

Type: `boolean`  
Default: `false`


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)

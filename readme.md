# gulp-webp [![Build Status](https://travis-ci.org/sindresorhus/gulp-webp.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-webp)

> Convert images to [WebP](https://developers.google.com/speed/webp/)

Supports PNG, JPEG, TIFF, WebP.


## Install

```
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

Unsupported files are ignored.

### webp(options)

See the [imagemin-webp](https://github.com/imagemin/imagemin-webp#imageminwebpoptions) options.

## License

MIT © [Sindre Sorhus](http://sindresorhus.com)

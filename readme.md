# gulp-webp

> Convert images to [WebP](https://developers.google.com/speed/webp/)

Supports PNG, JPEG, TIFF, WebP.


## Install

```
$ npm install --save-dev gulp-webp
```


## Usage

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

exports.default = () => (
	gulp.src('src/image.jpg')
		.pipe(webp())
		.pipe(gulp.dest('dist'))
);
```


## API

### webp(options?)

See the `imagemin-webp` [options](https://github.com/imagemin/imagemin-webp#imageminwebpoptions).

Note that unsupported files are ignored.

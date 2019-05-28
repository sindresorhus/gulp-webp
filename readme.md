# gulp-webp

> Convert images to [WebP](https://developers.google.com/speed/webp/)

Supports PNG, JPEG, TIFF, WebP.

## Install

```sh
npm install --save-dev gulp-webp
```

## Usage

```js
import gulp from 'gulp';
import webp from 'gulp-webp';

export default () => (
	gulp.src('src/image.jpg')
		.pipe(webp())
		.pipe(gulp.dest('dist'))
);
```

## API

### webp(options?)

See the `imagemin-webp` [options](https://github.com/imagemin/imagemin-webp#imageminwebpoptions).

Unsupported files are ignored and passed through.

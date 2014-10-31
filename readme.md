# gulp-webp

> Convert images to [WebP](https://developers.google.com/speed/webp/)


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


##### appendExtension

Type: `boolean`  
Default: `false`

Instead of changing the file extension it appends .webp extension to the file name.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)

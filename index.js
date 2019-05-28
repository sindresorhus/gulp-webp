import imageminWebp from 'imagemin-webp';
import {gulpPlugin} from 'gulp-plugin-extras';

const supportedExtensions = new Set([
	'png',
	'jpg',
	'jpeg',
	'tif',
	'tiff',
	'webp',
]);

export default function gulpWebp(options) {
	const instance = imageminWebp(options);

	return gulpPlugin('gulp-webp', async file => {
		if (!supportedExtensions.has(file.extname.slice(1).toLowerCase())) {
			return;
		}

		file.contents = await instance(file.contents);
		file.extname = '.webp';
		return file;
	});
}

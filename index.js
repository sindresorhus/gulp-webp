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

		try {
			file.contents = await instance(file.contents);
			file.extname = '.webp';
			return file;
		} catch (error) {
			// Pass through files that cannot be converted (e.g., CMYK images)
			if (error.message && error.message.includes('Unsupported color conversion request')) {
				return file;
			}

			throw error;
		}
	});
}

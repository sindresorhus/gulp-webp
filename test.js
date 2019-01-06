import path from 'path';
import test from 'ava';
import Vinyl from 'vinyl';
import vinylFile from 'vinyl-file';
import PluginError from 'plugin-error';
import pEvent from 'p-event';
import gulpWebp from '.';

test('converts images to WebP', async t => {
	const file = await vinylFile.read(path.join(__dirname, 'fixture.jpg'));
	const stream = gulpWebp();
	const size = file.contents.length;

	const promise = pEvent(stream, 'data');
	stream.end(file);
	const data = await promise;

	t.true(data.contents.length < size);
	t.is(data.path, path.join(__dirname, 'fixture.webp'));
});

test('should not convert unsupported files', async t => {
	const stream = gulpWebp();

	const promise = pEvent(stream, 'data');
	stream.end(new Vinyl({
		path: path.join(__dirname, 'fixture.jpg'),
		contents: Buffer.from('contents')
	}));

	const data = await promise;
	t.is(data.contents.toString(), 'contents');
});

test('emits a plugin error when the image is corrupt', async t => {
	const fileName = path.join(__dirname, 'fixture-corrupt.jpg');
	const file = await vinylFile.read(fileName);
	const stream = gulpWebp();

	const promise = pEvent(stream, 'error');
	stream.end(file);

	const error = await promise;
	t.true(error instanceof PluginError);
	t.is(error.plugin, 'gulp-webp');
	t.is(error.fileName, fileName);
});

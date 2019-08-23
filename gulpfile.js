const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const DEST = 'dist/o2';

gulp.task('readme', () => {
	return gulp
		.src('./README.md')
		.pipe(gulp.dest(DEST));
});

gulp.task('package', () => {
	return gulp
		.src('./package.json')
		.pipe(gulp.dest(DEST));
});

gulp.task('codebase', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(DEST));
});

gulp.task('public', () => {
	return gulp
		.src('./public/*', { base: 'other' })
		.pipe(gulp.dest(DEST + '/o2'));
});

gulp.task('default', gulp.series(['readme', 'package', 'codebase', 'public'], () => {
	console.log('default build complete');
	return Promise.resolve(true);
}));

const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const useref = require('gulp-useref');
const filter = require('gulp-filter');
const uglify = require('gulp-uglify');
const csso = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const notify = require('gulp-notify');

gulp.task('clean', function (done) {
  del.sync(['dist'])
  done()
})

gulp.task('html', function () {
  const jsFilter = filter('**/*.js', { restore: true });
  const cssFilter = filter('**/*.css', { restore: true });
  const indexHtmlFilter = filter(['**/*', '!**/*.html'], { restore: true });

  const stream = gulp.src('*.html')
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(indexHtmlFilter)
    .pipe(rev())
    .pipe(indexHtmlFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest('dist'));

  return stream;

});

//打包图片，新增图片，则需重新执行此任务
gulp.task('images', function () {
  return gulp.src('images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({
      message: 'Images task complete'
    }));
});

gulp.task('default',
  gulp.series('clean',
    gulp.parallel('html', 'images')
  ))



const {src, dest, series, watch, parallel} = require('gulp');
const browsersync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

function browserSync() {
  return browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000,
  });
}

function html() {
  return src('src/*.html')
  .pipe(
    htmlReplace({
      css: 'css/all-style.css',
      js: 'js/bundle.js',
    })
  )
  .pipe(dest('dist/'))
  .pipe(browsersync.stream());
}

function styles() {
  return src('src/styles/*.css')
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(concat('all-style.css'))
  .pipe(cleanCss())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/css/'))
  .pipe(browsersync.stream());
}

function scripts() {
  return src('src/scripts/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js/'))
  .pipe(browsersync.stream());
}

function watchFiles() {
    watch('src/scripts/*.js');
    watch('src/css/*.css');
    watch('src/*.html');
}

exports.watch = parallel(browserSync, watchFiles);
exports.default = series(html, styles, scripts);
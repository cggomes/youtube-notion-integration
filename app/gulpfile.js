'use strict';

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return src('public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('public/css'));
}

function watchTask() {
  watch(['public/sass/**/*.scss', '*.html'], buildStyles);
}

if (process.env.NODE_ENV === 'development') {
  exports.default = series(buildStyles, watchTask);
} else {
  exports.default = series(buildStyles);
}
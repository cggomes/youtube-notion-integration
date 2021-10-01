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

exports.default = series(buildStyles, watchTask);
'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var config       = require('../config');
var errorHandler = require('../utilities/errorHandler');
var gulp         = require('gulp');
var join         = require('path').join;
var minifyCss    = require('gulp-minify-css');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var util         = require('gulp-util');

module.exports = function() {

    return gulp.src(join(config.styles.src, '*.scss'))
        .pipe(config.production ? util.noop() : sourcemaps.init())
            .pipe(sass(config.sass))
                .on('error', errorHandler)
            .pipe(autoprefixer(config.autoprefixer))
                .on('error', errorHandler)
        .pipe(config.production ? util.noop() : sourcemaps.write())
        .pipe(config.production ? minifyCss() : util.noop())
        .pipe(gulp.dest(join(config.styles.dist)))
        .pipe(config.production ? util.noop() : browserSync.reload({ stream: true }));

};

'use strict';

var browserify = require('browserify');
var envify = require('envify');
var gulp = require('gulp');
var less = require('gulp-less');
var util = require('gulp-util');
var reactify = require('reactify');
var uglifyify = require('uglifyify');
var stream = require('vinyl-source-stream');
var watchify = require('watchify');

var isDev = process.env.NODE_ENV !== 'production';

function getBundler(bundler, watcher) {
  var file = './components/index.jsx';
  var bundled = watcher ? watcher(bundler(file, watcher.args)) : bundler(file);

  bundled.transform(reactify);
  if (!isDev) {
    bundled.transform(envify);
    bundled.transform({
      global: true
    }, uglifyify);
  }
  bundled.require('react');

  return bundled.require('./components/index.jsx');
}

function update(bundler) {
  util.log('Update bundler');
  return bundler
    .bundle()
    .on('error', util.log)
    .on('end', function() {
      return util.log('Bundle complete');
    })
    .pipe(stream('index.js'))
    .pipe(gulp.dest('public/scripts/'))
  ;
}

gulp.task('styles', function() {
  return gulp
    .src('assets/styles/index.less')
    .pipe(less())
    .on('error', util.log)
    .pipe(gulp.dest('public/styles/'))
  ;
});

gulp.task('copy-scripts', function() {
  return gulp
    .src('assets/scripts/**/*.js')
    .pipe(gulp.dest('public/scripts'))
  ;
});

gulp.task('browserify', function() {
  return update(getBundler(browserify));
});

gulp.task('watch', function() {
  var watch = getBundler(browserify, watchify);

  watch.on('update', function() {
    return update(watch);
  });

  return update(watch);
});

gulp.watch('assets/styles/index.less', ['styles']);

gulp.task('default', ['copy-scripts', 'styles', 'browserify']);

gulp.task('dev', ['copy-scripts', 'styles', 'watch']);

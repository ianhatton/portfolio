var config      = require('../config')
if(!config.tasks.sprites) return

var browserSync = require('browser-sync')
var buffer      = require('vinyl-buffer')
var csso        = require('gulp-csso')
var gulp        = require('gulp')
var gulpif      = require('gulp-if')
var imagemin    = require('gulp-imagemin')
var merge       = require('merge-stream')
var path        = require('path')
var spritesmith = require('gulp.spritesmith')

var spritesTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.sprites.src, '/**/*.{png,jpg}'),
    cssDest: path.join(config.root.src, config.tasks.sprites.cssDest),
    imgDest: path.join(config.root.dest, config.tasks.sprites.imgDest)
  }

  var spriteData = gulp.src(settings.src).pipe(spritesmith({
    imgName: 'sprites.png',
    imgPath: '../images/sprites.png',
    cssName: '_sprites.scss'
  }));

  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(settings.imgDest));

  var cssStream = spriteData.css
    // .pipe(csso())
    .pipe(gulp.dest(settings.cssDest));

  return merge(imgStream, cssStream)
  .pipe(gulpif('*.png', gulp.dest(settings.imgDest), gulp.dest(settings.cssDest)))
  .pipe(browserSync.stream())
}

gulp.task('sprites', spritesTask)
module.exports = spritesTask

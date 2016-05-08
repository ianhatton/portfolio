var config      = require('../config')
if(!config.tasks.sprites) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var gulpif      = require('gulp-if')
var sprity      = require('sprity')
var path        = require('path')

var spritesTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.sprites.src, '/**/*.{png,jpg}'),
    cssDest: path.join(config.root.src, config.tasks.sprites.cssDest),
    cssFile: './sprites.css',
    imgDest: path.join(config.root.dest, config.tasks.sprites.imgDest),
    processor: 'sass',
    split: true
  }

  return sprity.src({
    src: settings.src,
    style: settings.cssFile,
    processor: settings.processor,
    split: settings.split
  })
  .pipe(gulpif('*.png', gulp.dest(settings.imgDest), gulp.dest(settings.cssDest)))
  .pipe(browserSync.stream())
}

gulp.task('sprites', spritesTask)
module.exports = spritesTask

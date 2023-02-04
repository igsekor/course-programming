const fs = require('fs')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const csso = require('postcss-csso')
const pimport = require('postcss-import')
const autoprefixer = require('autoprefixer')
const del = require('del')
const rev = require('gulp-rev')
const revRewrite = require('gulp-rev-rewrite')

// Styles

const styles = () => {
  return gulp
    .src('src/styles/{index.css,index.sc.css,dark-theme.css}')
    .pipe(
      postcss([
        pimport,
        autoprefixer,
        csso({
          restructure: false,
        }),
      ])
    )
    .pipe(gulp.dest('dist/styles'))
}

// Clean

const clean = () => {
  return del(['dist/styles'])
}

// Cache

const cacheHash = () => {
  return gulp
    .src('dist/**/*.{css,js}')
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest('rev-manifset.json'))
    .pipe(gulp.dest('dist'))
}

const cacheReplace = () => {
  return gulp
    .src('dist/**/*.{html,css,svg}')
    .pipe(
      revRewrite({
        manifest: fs.readFileSync('dist/rev-manifset.json'),
      })
    )
    .pipe(gulp.dest('dist'))
}

const cache = gulp.series(cacheHash, cacheReplace)

// Default
exports.default = gulp.series(clean, styles, cache)

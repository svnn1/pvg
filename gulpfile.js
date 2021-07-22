/**
 * @author Silvano Santana <jnkppl@gmail.com>
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

const site = {
	scss: {
		index: "src/sass/svn.scss",
		all: "src/sass/**/*.scss",
		out: "./public/assets/css",
        minify: "svn.min.css"
	},
	jade: {
		index: "./src/jade/index.jade",
		all: "./src/jade/**/*.jade",
		out: "./public/"
	},
	html: {
		index: "./public/*.html"
	},
	js: {
		index: "src/js/svn.js",
		out: "public/assets/js",
		all: [
			"src/js/components/navigation.js",
			"src/js/components/slider.js",
			"src/js/components/scroll-top.js",
			"src/js/components/send-email.js"
		]
	},
	nano: {
		index: "./public/assets/css/svn.css",
        out: "./public/assets/css"
	}
};

gulp.task('templates', function () {
	return gulp.src(site.jade.index)
		.pipe(jade({locals: site.jade.all, pretty: true}))
		.pipe(gulp.dest(site.jade.out))
		.pipe(browserSync.stream());
});

gulp.task('sass', function () {
	return gulp.src(site.scss.index)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(site.scss.out))
		.pipe(browserSync.stream());
});

gulp.task('sass-watch', ['sass'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('js', function () {
	return gulp.src(site.js.all)
		.pipe(concat('svn.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(site.js.out))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function () {

	browserSync.init({
		server: {
			baseDir: "./public/"
		}
	});

	gulp.watch(site.scss.all, ['sass-watch']);
	gulp.watch(site.jade.all, ['templates']);
	gulp.watch(site.js.all, ['js']);
	gulp.watch(site.html.index).on('change', browserSync.reload);
});

gulp.task('css-nano', function () {
    return gulp.src(site.nano.index)
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(site.nano.out));
});

gulp.task('rename', function () {
	return gulp.src(site.scss.out + "svn.css")
        .pipe(sourcemaps.init())
		.pipe(rename(site.scss.minify))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(site.scss.out));
});

gulp.task('default', ['templates', 'js', 'serve', 'sass', 'sass-watch']);
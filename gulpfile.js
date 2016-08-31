//подключаем модули
var gulp 				 = require('gulp')
		sass 				 = require('gulp-sass'),
		browserSynk  = require('browser-sync'),
		concat			 = require('gulp-concat'),
		uglify			 = require('gulp-uglifyjs'),
		cssnano			 = require('gulp-cssnano'),
		rename			 = require('gulp-rename'),
		del					 = require('del'),
		imagemin		 = require('gulp-imagemin'),
		pngquant		 = require('imagemin-pngquant'),
		cache				 = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer');

//конвертируем sass в css
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSynk.reload({stream: true}))
});

//сжимает все libs
gulp.task('css-libs',['sass'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

//синхронизирум с браузером
gulp.task('browser-sync', function() {
	//в переменную созданную в начале определим параметры
	browserSynk({
		//определяем базовую папку
		server: {
			baseDir: 'app'
		},
		//отключаем уведомление о соединении
		notify: false
	});
});

//чистим папку dist
gulp.task('clean', function() {
	return del.sync('dist');
});

//чистим ceche
gulp.task('clear', function() {
	return cache.clearAll();
});

//оптимизируем img
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
		.pipe(gulp.dest('dist/img'));
});

//следим за изменениями в sass и выполняем task sass
//перед запуском функции выполняем параметры в массиве
//чтобы все изменения скомпилировались пере перед запуском
//сервера
gulp.task('watch', ['browser-sync', 'css-libs'], function() {
	//первое значение файлы за которыми следим
	//второе значение выбираем какой таск выполнить
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSynk.reload);
	gulp.watch('app/js/**/*.js', browserSynk.reload);
});

//Готовим к продакшену
gulp.task('build',['clean', 'img', 'sass'], function() {
	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css',
		])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});

//дефолтный таск
gulp.task('default', ['watch']);
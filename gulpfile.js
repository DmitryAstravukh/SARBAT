var gulp       	 = require('gulp'),
		browserSync  = require('browser-sync'),
		smartgrid    = require('smart-grid'),
		less         = require('gulp-less'),
		gcmq         = require('gulp-group-css-media-queries'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCss 		 = require('gulp-clean-css'),
		uglify       = require('gulp-uglifyjs'), 
		cssnano      = require('gulp-cssnano'), 
		rename       = require('gulp-rename'), 
		imagemin     = require('gulp-imagemin'), 
		pngquant     = require('imagemin-pngquant');


gulp.task('less', function(){
	return gulp.src('app/less/main.less')
	.pipe(less())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function () {
    gulp.src('app/css/main.css')
    	.pipe(cleanCss({level: { 2: { restructureRules: true, mergeSemantically: true } }}))
      .pipe(gcmq())
      .pipe(autoprefixer({ browsers: ['last 15 versions', '> 1%' , 'ie 9'],cascade: false}))
      .pipe(gulp.dest('app/css'));
});

gulp.task('grid', function(){
	smartgrid('app/less',{
		container:{
			maxWidth: '1170px',
		}
	});
});

gulp.task('watch', ['browser-sync', 'less'], function(){
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		//.pipe(cache(imagemin({ // С кешированием
		.pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build',['img'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		'app/css/reset.css',
		'app/css/slick.css',
		'app/css/slick-theme.css',
		'app/css/font-awesome.css',
		'app/css/animate.css'
		])
	.pipe(cssnano()) // Сжимаем
	.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(uglify()) 
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});
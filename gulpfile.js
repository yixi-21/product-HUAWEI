//先导入模块
const gulp = require('gulp');
const sass=require('gulp-sass')
// const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
//创建或发布任务
//测试任务
/* function fnTest(){
    console.log('测试成功');
} */
//处理css的任务
function fnCss(){
    return gulp.src('./src/sass/*.scss')
        .pipe(sass({outputStyle: 'expanded'})) 
        // .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/css'));
}

//处理js的任务
function fnJS(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    // .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}

//压缩图片
function fnImg(){
    return gulp.src('./src/img/*/*')
    // .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}
//复制首页
function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}

function fnCopyLib(){
    return gulp.src('./src/lib/*')
    .pipe(gulp.dest('./dist/lib'))
}
function fnCopyPhp(){
    return gulp.src('./src/php/*')
    .pipe(gulp.dest('./dist/php'))
}
function fnCopyHtml(){
    return gulp.src('./src/html/*')
    .pipe(gulp.dest('./dist/html'))
}
function fnCopyIcon(){
    return gulp.src('./src/iconfont/*')
    .pipe(gulp.dest('./dist/iconfont'))
}

//创建监听任务
function fnWatch(){
    gulp.watch('./src/sass/*.scss',fnCss);
    gulp.watch('./src/js/*.js',fnJS);
    gulp.watch('./src/img/*/*',fnImg);
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/lib/*',fnCopyLib);
    gulp.watch('./src/php/*',fnCopyPhp);
    gulp.watch('./src/html/*',fnCopyHtml);
    gulp.watch('./src/iconfont/*',fnCopyIcon);
}
//导出模块
// exports.css = fnCss;
// exports.js = fnJS;
// exports.img = fnImg;
// exports.copyIndex = fnCopyIndex;
// exports.copyLib = fnCopyLib;
// exports.copyPhp = fnCopyPhp;
// exports.copyHtml = fnCopyHtml;
// exports.copyIcon = fnCopyIcon;
exports.default = fnWatch;
// exports.all = parallel(fnCss,fnJS,fnCopyIndex,fnWatch,fnImg);

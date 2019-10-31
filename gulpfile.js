const gulp = require('gulp');
const mocha = require('gulp-mocha');
const del = require('del');

const ts = require('gulp-typescript');
const project = ts.createProject('./tsconfig.json');
const typedoc = require('gulp-typedoc');

gulp.task('test', () => {
    return gulp.src('./test/**/*.test.ts')
        .pipe(mocha({
            require: ['ts-node/register']
        }));
});

gulp.task('clean', () => {
    return del(['./dist']);
});

gulp.task('compile', () => {
    return project.src()
        .pipe(project())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('copy-gs', () => {
    return gulp.src([
        './src/gs/**/*'
    ])
        .pipe(gulp.dest('./dist/gs'));
});

gulp.task(('docs'), ()=>{
    return gulp.src(['./src/**/*.ts'])
    .pipe(typedoc({
        out:'./dist/doc'
    }));
});

gulp.task('build', gulp.series('test', 'clean', 'compile', 'copy-gs', 'docs'));
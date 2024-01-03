// TODO: Solve any related errors
const { src, dest, series, watch, parallel } = require("gulp")

const eslint = require("gulp-eslint")
const merge = require("merge2")
const sourcemaps = require("gulp-sourcemaps")
const typescript = require("gulp-typescript")
// const uglify = require("gulp-uglify")

const tsProj = typescript.createProject("tsconfig.json")

function lint(cb) {
    return tsProj.src()
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

function compile(cb) {
    const compilationResult = tsProj.src()
        .pipe(sourcemaps.init())
        .pipe(tsProj())
    return merge([
        compilationResult.js,
        compilationResult.dts,
    ].map(result => result
        .pipe(sourcemaps.write('.', { sourceRoot: './', includeContent: false }))
        .pipe(dest("dist"))
    ))
}

function gwatch(cb) {
    return watch(["src/**/**/*.ts"],
        { delay: 500, queue: true, ignoreInitial: false },
        series(
            lint,
            compile,
        )
    )
}

exports.default = series(
    gwatch
)

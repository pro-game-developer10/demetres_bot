// TODO: Solve any related errors
const { src, dest, series, watch, parallel } = require("gulp")

const eslint = require("gulp-eslint")
const typescript = require("gulp-typescript")
// const uglify = require("gulp-uglify")

const tsProj = typescript.createProject("tsconfig.json")

function lint(cb) {
    return src("src/*.ts")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

function compile(cb) {
    return src("src/**/**/*.ts")
        .pipe(tsProj())
        .js
        // .pipe(uglify())
        .pipe(dest("dist"))
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

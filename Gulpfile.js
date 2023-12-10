// TODO: Solve any related errors
const { src, dest, series } = require("gulp")

const eslint = require("gulp-eslint")
const notify = require("gulp-notify")
const rename = require("gulp-rename")
const typescript = require("gulp-typescript")
const uglify = require("gulp-uglify")

const tsProj = typescript.createProject("tsconfig.json")

function lint(cb) {
    return src("src/**/**/*.ts")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

function compile(cb) {
    return src("src/**/**/*.ts")
        .pipe(tsProj())
        .js
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(dest("output"))
}

exports.default = series(
    lint,
    compile,
)

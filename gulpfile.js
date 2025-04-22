const {src, dest, watch, series} = require('gulp'),
    htmlCompressor = require('gulp-htmlmin');

let compressHTML = () => {
    return src(`app/html/*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/html/`));
};

exports.compressHTML = compressHTML;

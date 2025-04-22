const {src, dest, watch, series} = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`);

let compressHTML = () => {
    return src(`app/html/*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/html/`));
};

let validateHTML = () => {
    return src([`app/html/*.html`])
        .pipe(htmlValidator(undefined));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;

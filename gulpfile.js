const {src, dest, watch, series} = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`)
    CSSLinter = require(`gulp-stylelint`);

let compressHTML = () => {
    return src(`app/html/*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/html/`));
};

let validateHTML = () => {
    return src([`app/html/*.html`])
        .pipe(htmlValidator(undefined));
};

let lintCSS = () => {
    return src(`app/css/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                { formatter: `string`, console: true }
            ]
        }));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;

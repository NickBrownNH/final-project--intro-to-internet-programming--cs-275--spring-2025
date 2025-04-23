const {src, dest, watch, series} = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    CSSLinter = require(`gulp-stylelint`),
    csso = require(`gulp-csso`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    babel = require(`gulp-babel`);

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

let compileCSSForProd = () => {
    console.log(`Minifying CSS...`);
    return src(`./app/css/*.css`)
        .pipe(csso())
        .pipe(dest(`prod/styles`))
        .on(`end`, () => {
            console.log(`CSS minification complete. Files saved to prod/styles`);
        });
};

let lintJS = () => {
    return src(`app/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`app/js/*.js`)
        .pipe(babel())
        .on(`error`, (err) => {
            console.error(`Babel error:`, err);
        })
        .pipe(dest(`./temp/js`))
        .on(`end`, () => {
            console.log(`Transpilation complete. Files saved to ./temp/js`);
        });
};

let transpileJSForProd = () => {
    return src(`app/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.compileCSSForProd = compileCSSForProd;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;

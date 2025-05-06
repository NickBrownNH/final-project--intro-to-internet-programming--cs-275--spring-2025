const {src, dest, watch, series} = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    CSSLinter = require(`gulp-stylelint`),
    csso = require(`gulp-csso`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    babel = require(`gulp-babel`),
    deleteAsync = require(`del`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let compressHTML = () => {
    return src(`app/html/*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod`));
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
        .pipe(dest(`prod/css`))
        .on(`end`, () => {
            console.log(`CSS minification complete. Files saved to prod/css`);
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

let transpileJS = () => {
    return src(`app/js/*.js`)
        .pipe(babel())
        .on(`error`, (err) => {
            console.error(`Babel error:`, err);
        })
        .pipe(dest(`temp/js`));
};

let compressJSForProd = () => {
    console.log(`Compressing JavaScript...`);
    return src(`./temp/js/*.js`)
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`))
        .on(`end`, () => {
            console.log(`JavaScript compression complete. Files saved to prod/js`);
        });
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: `default`,
        server: {
            baseDir: [
                `temp`,
                `./app`,
                `./app/html`,
            ]
        }
    });

    watch(`app/js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`app/css/*.css`, lintCSS)
        .on(`change`, reload);

    watch(`app/html/*.html`, validateHTML)
        .on(`change`, reload);
};

async function clean() {
    const foldersToDelete = await deleteAsync([`./temp`, `prod`]);

    console.log(`The following directories were deleted:`, foldersToDelete);
}

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.compileCSSForProd = compileCSSForProd;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJS = transpileJS;
exports.serve = serve;
exports.clean = clean;
exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJS,
    compressJSForProd
);
exports.default = serve;

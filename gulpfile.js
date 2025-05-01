const {src, dest, watch, series} = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    CSSLinter = require(`gulp-stylelint`),
    csso = require(`gulp-csso`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

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

let transpileJSForProd = () => { //Split the transpile and compression tasks for production (use in series instead)
    return src(`app/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
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
    const { deleteAsync } = await require(`del`);
    let fs = require(`fs`),
        foldersToDelete = [`./temp`, `prod`];

    for (let folder of foldersToDelete) {
        try {
            fs.accessSync(folder, fs.F_OK);
            process.stdout.write(`\n\tThe ${folder} directory was found and will be deleted.\n`);
        } catch (e) {
            process.stdout.write(`\n\tThe ${folder} directory does NOT exist or is NOT accessible.\n`);
            continue;
        }

        await deleteAsync(folder);
    }

    process.stdout.write(`\n`);
}

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.compileCSSForProd = compileCSSForProd;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = serve;
exports.clean = clean;
exports.build = series(
    clean,
    compressHTML,
    compileCSSForProd,
    transpileJSForProd
);
exports.default = serve;

# Spring 2025 Intro to Internet Programming — Final Project

☞ **Plagiarism in any form will result in failing the entire course. You’ve been duly warned.** ☜

* **Read these instructions repeatedly until you understand, then begin your project. If something is not clear, ask.**

---

## ❖・Introduction・❖

The basic rules and requirements for this final project are available in the 8-minute video found at [https://roy.vanegas.org/video/cs-275--final-project-instructions.mp4](https://roy.vanegas.org/video/cs-275--final-project-instructions.mp4). Read on for more detailed rules.

---

## ❖・Rules・❖

Before you begin, **update Node, NPM, ESLint, and Stylelint**

### General

* There should not be any scroll bars on the page - horizontal.
* Author your code according to the included `.editorconfig` rules. (**Do not alter**.)
* Validate/lint JavaScript according to the included `.eslintrc` rules. (**Do not alter**.)
* Validate/lint CSS according to the included `.stylelintrc.json` rules. (**Do not alter**.)
* Inspect the `.gitignore` file so you can better understand the scaffold requirements for this assignment.

### HTML

* Include the following minimal HTML required for this project in `app/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Sliding Diamond</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <div id="diamond-container"></div>
    <script src="js/app.js"></script>
  </body>
</html>
```

### CSS

* You’re free to style this as you wish, as long as the shape of the diamond approximates the rendering in the video discussed earlier.
* All CSS *must* go in `app/css/style.css`.

### JavaScript

* All DOM manipulations *must* take place via JavaScript.
* All JavaScript *must* go in `app/js/app.js`.
* Your code should not generate any ESLint errors, except warnings for line lengths.
* Use backticks exclusively for all strings and variable interpolation.
* Avoid function hoisting; use *only* arrow functions.
* Avoid variable hoisting; use *only* `let` declarations.

### Task Running with Gulp

* You must employ Gulp, **version 5**, as the task runner, with workflows for development and production. **Only include the tasks requested below.**
* `gulpfile.js`, `package.json`, and `package-lock.json` must go in the root of this repository.
* You must develop the following tasks, each of which is self-explanatory: `validateHTML`, `validateCSS`, `validateJS`, `compressHTML`, `compressCSS`, `compressJS`, `transpileJSForDev`, `transpileJSForProd`.

#### Development

* Your CSS must validate using the enclosed `.stylelintrc.json` file.
* Your JavaScript must validate using the included `.eslintrc.json` file.
* Your JavaScript must transpile to ES5.
* The development, or dev, track must validate HTML, CSS and JavaScript each time you save a `.html`, `.css`, or `.js` file.
* Additionally, the development track must also refresh the browser when any of the aforementioned files have changed.
* `gulp` triggers the dev track.

#### Production

* The production, or prod, track must compress all the aforementioned languages. *Do not lint them*, as they will have already been linted in the development track.
* `gulp build` should load the entire production environment into a folder called `prod`, which must be fully self-sufficient and contain all the required files — compressed and linted — for the web page. **Note**: Check that your entire project works as a standalone web app in the `prod` folder. You can do so by moving the `prod` folder elsewhere in your file system before submitting, then launching `index.html`.

---

## ❖・Due・❖

Tuesday, 6 May 2025, at 1:30 PM.

---

## ❖・Grading・❖

| Item                                                                   | Points |
|------------------------------------------------------------------------|:------:|
| Assignment works, according to instructions                            |  `50`  |
| All code is neat, professional, and formatted according to conventions |  `50`  |

**Tip**: To ensure the files required for this assignment are not being ignored, clone this repo into a different folder on your computer, or to a different computer altogether.

---

## ❖・Submission・❖

You will need to issue a pull request back into the original repo, the one from which your fork was created for this project. See the **Issuing Pull Requests** section of [this site](http://code-warrior.github.io/tutorials/git/github/index.html) for help on how to submit your assignment.

**Note**: This assignment may *only* be submitted via GitHub. **No other form of submission will be accepted**.

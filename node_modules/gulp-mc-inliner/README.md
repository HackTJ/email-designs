# gulp-mc-inliner
Gulp plugin for inlining CSS throught MailChimps Inliner API.

[![NPM](https://nodei.co/npm/gulp-mc-inliner.png)](https://npmjs.org/package/gulp-mc-inliner)

## Usage

```shell
npm install gulp-mc-inliner --save-dev
```

Create `mailchimp.json` file and add your MailChimp API key.

```javascript
{
  "KEY": "your key goes here"
}
```

Require both in your `gulpfile.js`:

```javascript
var inliner = require('gulp-mc-inliner');
var config = require('config/mailchimp');

gulp.task('inline', function() {
  gulp.src('src/*.html')
    .pipe(inliner(config.KEY))
    .pipe(gulp.dest('email/template.html'));
});
```

## API

### inliner(key, strip)

#### key
Type: `String`

MailChimp API Key.<br>
<small>*Create a API key from your MailChimp Account.*</small>

#### stripCSS
Type: `boolean`
Default: `false`

Boolean value indicating to the MailChimp API whether to strip CSS from the head tag.

---

<small>*This gulp plugin is a rewite of https://github.com/jayzawrotny/gulp-mc-inline-css with added option to specify whether or not to strip style tags from the head tag.*</small>

<small>*More features coming soon.*</small>
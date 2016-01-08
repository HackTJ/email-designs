var MailChimpAPI = require('mailchimp').MailChimpAPI;
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

const PLUGIN_NAME = 'gulp-mc-inliner';
const API_VERSION = '2.0';

var api;
function mcInliner(key, strip) {
	if(typeof strip !== 'boolean'){
		strip = false;
	}
	try {
		api = apiAccess(key);
		return handleAPICall(strip);
	} catch (err) {
		console.log(err.message);
	}
}

function apiAccess(key) {
	if(!key) throw new gutil.PluginError(PLUGIN_NAME, "MailChimp API Key required.");
	return new MailChimpAPI(key, {version: API_VERSION});
}

function handleAPICall(strip) {
	var stream = through.obj(function(file, enc, cb) {
		if(file.isNull()) {
			this.push(file);
			return cb();
		}
		
		if(file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, "Steams are not supported."));
			return cb();
		}

		api.call('helper', 'inline-css', {'html': file.contents.toString('utf8'), 'strip_css': strip}, function(err, data){
			if(err) {
				this.emit('error', new gutil.PluginError(PLUGIN_NAME, err.message));
			}	else {
				gutil.log(gutil.colors.magenta(path.basename(file.path)), 'was', gutil.colors.green('inlined'));
				file.contents = new Buffer(data.html);
			}
			this.push(file);
			return cb();
		}.bind(this));
	});
	return stream;
}

module.exports = mcInliner;
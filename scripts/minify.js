#!/usr/bin/env node
const purify = require('purify-css');
const fs = require('fs');
const crass = require('crass');
const uglify = require('uglify-js');

const workdir = process.cwd();
const content = [workdir + '/__static/*.html'];
const css = [workdir + '/node_modules/w3-css/w3.css', workdir + '/css/*.css'];

purify(content, css, (purifiedCSS) => {
	var parsed = crass.parse(purifiedCSS);
	parsed = parsed.optimize();
	fs.writeFileSync(workdir + '/__static/client.css', parsed);
});

const jsfiles = fs.readdirSync(workdir + '/js');
var jscontent = new Object();

for (var i=0; i<jsfiles.length; i++) {
	const path = workdir + '/js/' + jsfiles[i];
	jscontent[jsfiles[i]] = fs.readFileSync(path, {encoding: 'utf8'});
}

const minifiedjs = uglify.minify(jscontent, { toplevel: true });
fs.writeFileSync(workdir + '/__static/client.js', minifiedjs.code);

#!/usr/bin/env node
const fs = require('fs');
const pug = require('pug');
const mkdirp = require('mkdirp');

const workdir = process.cwd();

mkdirp(workdir + '/__static/images', (err) => {
	if (err) console.error(err);
});

var images = fs.readdirSync(workdir + '/images');
for (var i=0; i<images.length; i++) {
	const image = fs.readFileSync(workdir + '/images/' + images[i]);
	fs.writeFileSync(workdir + '/__static/images/' + images[i], image);
	images[i] = images[i].split('.')[0];
}

const options = {
	things: images
}

const html = pug.renderFile(workdir + '/templates/index.pug', options);
fs.writeFileSync(workdir + '/__static/index.html', html);

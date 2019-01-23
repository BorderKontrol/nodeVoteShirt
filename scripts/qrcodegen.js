#!/usr/bin/env node
const qr = require('qrcode');
const fs = require('fs');

const workdir = process.cwd();
const file = fs.readFileSync(workdir + '/file', 'utf8');
var array = file.split('\n');
array.splice(array.length - 1);

for (var i = 0; i < 60; i++) {
	qr.toFile(workdir + '/images/qr/' + i.toString() + '.svg', 'https://dickord.club/tshirt/' + array[i], { type: 'svg', scale: 8 });
}

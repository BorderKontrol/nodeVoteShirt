const qr = require('qrcode');
const fs = require('fs');

const file = fs.readFileSync('./file', 'utf8');
var array = file.split('\n');
array.splice(array.length - 1);
for (var i = 0; i < 60; i++) {
	qr.toFile('./images/' + i.toString() + '.svg', 'https://dickord.club/tshirt/' + array[i], { type: 'svg', scale: 8 });
}

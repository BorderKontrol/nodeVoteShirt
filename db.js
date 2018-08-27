const nosql = require('nosql');
const crypto = require('crypto');
var db = nosql.load('db.nosql');

for (var i = 0; i < 60; i++) {
	crypto.randomBytes(18, (err, buffer) => {
		const secret = buffer.toString('base64');
		const key = {
			"authcode": secret
		}
		db.insert(key, true).where('authcode', secret).callback((err, response) => {
			if (response === 0) {i--; console.log('lucky one. lets do it again.');}
		});
	});
}

const express = require('express');
const app = express();
const nosql = require('nosql');
const path = require('path');
const db = nosql.load('./db.nosql');

app.set('trust proxy', 'loopback');
app.set('x-powered-by', false);

app.use(express.urlencoded({
	extended: true
}));

app.post('/__api/vote', (req, res) => {
	if (!req.body.shirt) return res.status(400).send('Kein T-Shirt angegeben.').end();
	const shirt = req.body.shirt;
	const authcode = req.body.authcode;
	db.one().where('authcode', authcode).callback((err, response) => {
		if (!response) return res.status(400).send('Ungültiger Code.').end();
		db.remove().where('authcode', authcode);
		const voterfraud = {
			"votedID": authcode,
			"shirt": shirt
		};
		db.insert(voterfraud);
		res.send('Erfolgreich für ' + shirt + ' abgestimmt.').end();
	});
});

app.listen(8080);

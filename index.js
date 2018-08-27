const express = require('express');
const app = express();
const nosql = require('nosql');
const path = require('path');
const db = nosql.load('./db.nosql');

app.use(express.urlencoded({
	extended: true
}));

app.get('/client.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/client.js'));
});

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/*', (req, res) => {
	if (!req.body.shirt) return res.status(400).send('Kein T-Shirt angegeben.').end();
	const shirt = req.body.shirt;
	const authcode = req.body.authcode;
	db.one().where('authcode', authcode).callback((err, response) => {
		if (!response) return res.status(400).send('Ungültiger Code.').end();
		db.remove().where('authcode', authcode);
		const voterfraud = {
			"votedID": response.authcode,
			"shirt": shirt
		};
		db.insert(voterfraud);
		res.send('Erfolgreich für ' + shirt + ' abgestimmt.').end();
	});
});

app.listen(8080);

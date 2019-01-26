#!/usr/bin/env node
const nosql = require('nosql');

const workdir = process.cwd();
var db = nosql.load(workdir + '/db.nosql');

var temp = [];
var results = [];
db.find().fields('shirt').callback((err, response) => {
	for (var i=0; i<response.length; i++) {
		if (response[i].shirt) temp.push(response[i].shirt);
	}
	temp = temp.sort();
	results[0] = {
		shirt: temp[0],
		count: 1
	}
	var c = 0;
	for (var i=1; i<temp.length; i++) {
		if (temp[i] == results[c].shirt) results[c].count++
		else {
			c++;
			results[c] = {
				shirt: temp[i],
				count: 1
			}
		}
	}
	console.log(results);
});

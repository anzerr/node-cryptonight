'use strict';
let multiHashing = require('../../build/Release/cryptonight-hashing');
let fs = require('fs');
let lineReader = require('readline');

let testsFailed = 0, testsPassed = 0, line_count = 0;
let lr = lineReader.createInterface({
	input: fs.createReadStream('./test/tests/data/cryptonight_heavy.txt')
});
lr.on('line', (line) => {
	let line_data = line.split(/ (.+)/);
	line_count += 1;
	multiHashing.cryptonight_heavy_async(Buffer.from(line_data[1], 'hex'), (err, result) => {
		result = result.toString('hex');
		if (line_data[0] !== result){
			console.error(line_data[1] + ': ' + result);
			testsFailed += 1;
		} else {
			testsPassed += 1;
		}
		if (line_count === (testsFailed + testsPassed)){
			if (testsFailed > 0){
				console.log(testsFailed + '/' + (testsPassed + testsFailed) + ' tests failed on: cryptonight_heavy_async');
			} else {
				console.log(testsPassed + ' tests passed on: cryptonight_heavy_async');
			}
		}
	});
});
lr.on('error', (err) => console.log('cryptonight_heavy_async', err));

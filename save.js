'use strict';

const fs = require('fs');

const Rsync = require('rsync');

const run = () => {

	let fileSource = process.argv[1];

	let givenSource = process.argv[2];

	let givenDestination = process.argv[3];

	let fileBreakdown = fileSource.split('/')//.filter(k => k.length);

	let sourceBreakdown = givenSource.split('/').filter(k => k.length);

	fileBreakdown.pop();

	const source = fileBreakdown.concat(sourceBreakdown);

	const fSource = source.join('/').trim();

	const rsync = new Rsync()
	  .shell('ssh')
	  .exclude([ 'package-lock.json', 'node_modules*'])
	  .flags('aq')
	  .source(fSource)
	  .destination(givenDestination);

	rsync.execute(function(error, code, cmd) {
		if(error) {
			console.log('error in sync: ', error);
		}
		console.log('execute code: ', code);
		console.log('executed cmd: ', cmd)
	});
}

run()

// rsync -a ~/bouncing/o2/dist/o2 root@Omega-498f.local:~/test

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

// rsync -a ~/bouncing/o2/dist/o2 root@Omega-498f.local:~/test'

// Rsync Exit Codes
// 0 Success
// 1 Syntax or usage error
// 2 Protocol incompatibility
// 3 Errors selecting input/output files, dirs
// 4 Requested action not supported: an attempt was made to manipulate 64-bit files on a platform that cannot support them; or an option was specified that is supported by the client and not by the server.
// 5 Error starting client-server protocol
// 10 Error in socket I/O
// 11 Error in file I/O
// 12 Error in rsync protocol data stream
// 13 Errors with program diagnostics
// 14 Error in IPC code
// 20 Received SIGUSR1 or SIGINT
// 21 Some error returned by waitpid()
// 22 Error allocating core memory buffers
// 23 Partial transfer due to error
// 24 Partial transfer due to vanished source files
// 30 Timeout in data send/receive

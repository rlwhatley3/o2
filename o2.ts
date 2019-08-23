
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const { Socket }= require('./lib/models/Socket.js');

const { Group } = require('./lib/models/Group.js');

const { DB } = require('./lib/poc_db/db.js');

const ENV = process.argv[2] || 'prod';

const db = new DB(ENV);

const port = 8888;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const refreshSocketsPins = (sockets: any[]) => {
	sockets.forEach(rs => {
		if(rs.pin) {
			rs.pin.get();
		}
	});
}

const refreshGroupsSocketsPins = (grups: any[]) => {
	grups.forEach(g => {
		refreshSocketsPins(g.sockets || [])
	});
};

router.get('/groups', (req:any, res:any) => {
	refreshGroupsSocketsPins(db.groups)
  res.json({ groups: db.groups });
});

router.get('/sockets', (req:any, res:any) => {
	refreshSocketsPins(db.sockets);
	res.json({ sockets: db.sockets });
});

router.post('/layout', (req:any, res:any) => {
	console.log('request', req.body);

	const modifySockets = req.body.modifySockets || [];

	modifySockets.forEach((s: any) => {
		const realSocket = db.sockets.find((rs:any) => rs.id === parseInt(s.id));
		if(!realSocket) return console.error(`${s.id} is not a valid socket id`);

		realSocket.pin.set(s.desired_state);
	})

	res.sendStatus(200);
});

app.use(router);

app.use(function(err: any, req: any, res:any, next:any) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
})

app.listen(port, (err:any) => {
	if(err) {
		console.log('error in server: ', err);
		return;
	}
	console.log(`server running on port ${port}`);
});

export {}; //typescript: https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files









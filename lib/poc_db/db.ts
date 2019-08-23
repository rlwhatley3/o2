const { Socket }= require('../models/Socket.js');

const { Group } = require('../models/Group.js');

class DB {
	groups: Array<any>;
	sockets: Array<any>;
	defaultSockets: Array<any>;

	constructor(env: any) {
		if(env !== 'dev') {
			this.setup();
		}
	}

	setup() {
		const s1 = new Socket({ id: 1 });
		const s2 = new Socket({ id: 2 });
		const s3 = new Socket({ id: 3, pin: '0' });
		const s4 = new Socket({ id: 4, pin: '0' });
		const s5 = new Socket({ id: 5, pin: '2' });
		const s6 = new Socket({ id: 6, pin: '3' });
		const s7 = new Socket({ id: 7, pin: '18' });
		const s8 = new Socket({ id: 8, pin: '19' });

		const defaultSockets = [s1, s2, s3, s4, s5, s6, s7, s8];

		const g1 = new Group({ id: 'A', sockets: defaultSockets.slice(0, 2) });
		const g2 = new Group({ id: 'B', sockets: defaultSockets.slice(2, 4) });
		const g3 = new Group({ id: 'C', sockets: [defaultSockets[4]] });
		const g4 = new Group({ id: 'D', sockets: [defaultSockets[5]] });
		const g5 = new Group({ id: 'E', sockets: [defaultSockets[6]] });
		const g6 = new Group({ id: 'F', sockets: [defaultSockets[7]] });

		this.groups = [g1, g2, g3, g4, g5, g6];

		this.sockets = [].concat.apply([], this.groups.map(g => g.sockets));

		this.groups.forEach(group => {
			let script = `\n## GROUP ${group.id} ## \n`;
			group.sockets.forEach((socket:any) => {
				const pin = socket.pin;
				script += `\n     Socket: ${socket.id},`;
				if(socket.type === 'static') {
					script += ` a static socket that always provides power.`;
				} else {
					const pinValue = pin ? pin.get() : 0;
					const onOff = pinValue === 0 ? 'Powered' : 'Unpowered';
					script += ` a volatile socket that could be either on or off. It should currently be ${ onOff }.`;
					script += `\n     Corresponding GPIO: ${ pin ? pin.pin : 'n/a' }, GPIO Value: ${ pin ? pin.get() : 'n/a' }`;
					script += `\n`;
				}
			});
			console.log(script);
		});

	}
}


module.exports = { DB };



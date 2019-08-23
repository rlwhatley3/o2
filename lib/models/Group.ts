import { ISocket } from './Socket';

export interface IGroup {
	id: string;
	sockets: Array<ISocket>;
}

class Group implements IGroup {
	id: string;
	sockets: Array<ISocket>;

	constructor(data: any) {
		this.id = data.id;
		this.sockets = data.sockets;
	}
}

module.exports = { Group };
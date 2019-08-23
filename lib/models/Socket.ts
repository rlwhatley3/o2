
import { IPin } from './Pin';

export interface ISocket {
	id: number;
	type: 'static' | 'volatile';
	pin: IPin
}

const Omega2Gpio = require('o2-gpio');

const gpio = new Omega2Gpio();

class Socket implements ISocket {
	id: number;
	pin: IPin;
	type: 'static' | 'volatile';

	constructor(data: { id: number, type: 'static' | 'volatile', pin: string }) {
		this.id = data.id;

		if(!data.pin || data.pin === null) {
			this.pin = null;
			this.type = 'static';
		} else {
			this.type = 'volatile';
			this.pin = gpio.pin(parseInt(data.pin));
		}
	}

}

module.exports = { Socket };
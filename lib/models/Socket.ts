
import { IPin } from './Pin';

export interface ISocket {
	id: number;
	type: 'static' | 'volatile';
	pin: any;
	toggle: any;
}

const Omega2Gpio = require('o2-gpio');

const gpio = new Omega2Gpio();

class Socket {
	id: number;
	pin: IPin | string | any;
	type: 'static' | 'volatile';

	constructor(data: { id: number, type: 'static' | 'volatile', pin: string }) {
		this.id = data.id;

		if(!data.pin || data.pin === null) {
			this.pin = null;
			this.type = 'static';
		} else {
			this.type = 'volatile';
			if(process.env.NODE_ENV === 'prod') {
				this.pin = gpio.pin(parseInt(data.pin));
			} else {
				this.pin = { pin: parseInt(data.pin), value: 0, mode: 'output' }
			}
		}
	}

	toggle: any = function() {
		if(process.env.NODE_ENV === 'dev') {
			console.log('toggle function called');
			return this.pin.value = this.pin.value === 0 ? 1 : 0;
		}
		this.pin.set(!this.pin.get());
		return this.pin.get();
	}
}

module.exports = { Socket };
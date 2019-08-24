
/* eslint-disable */

<template>
	<div class="container">
		<h2>Socket Controller</h2>
		<p>{{ msg }}</p>
		<button v-on:click="groups"> WTF </button>
		<div class="card">
			<div class="outlets" v-if="physical_groups.length > 0">
				<div class="group group-double" v-for="group in physical_groups">
					<!-- {{group.id}} -->
						<button v-for="socket in group.sockets" class="socket socket-double always-on" v-on:click="toggle(socket)" v-bind:class="{ active: socket.type === 'static' || socket.pin === null || socket.pin.value === 0 }">
							{{ socket.id }}
						</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const axios = require('axios');

	const base = `http://`;

	const prod_url = 'omega-498f.local';

	const dev_url = 'localhost'

	const port = ':8888';

	console.log('current env', process.env.NODE_ENV);

	const url = process.env.NODE_ENV === 'production' ? dev_url : dev_url;

	const base_url = base + url + port;

	export default {
		name: 'app',
		data: () => {
			return {
				hello: 'Hai gais!',
				msg: `System: OK...`,
				grps: [],
				sckts: [],
				physical_groups: [],
				current_layout: {}
			}
		},
		mounted: function () {
			console.log('app is mounted');
			this.groups();
			this.sockets();
		},
		methods: {
			groups: function () {
				console.log('groups called...');

				axios.get(`${base_url}/groups`).then(
					(res, err) => {
						if(err) {
							console.log('error: ', err);
							return;
						};

						this.grps = res.data && res.data.groups ? res.data.groups : [];

						console.log('groups fetched: ', res);
						return this.grps;
					});
			},
			sockets: function () {
				axios.get(`${base_url}/sockets`).then((res, err) => {
					this.sckts = res.data && res.data.sockets ? res.data.sockets : [];
					this.physical_groups = [];
					let current_group = {
						sockets: [],
					}
					this.sckts.forEach(s => {
						current_group.sockets.push(s);
						if(current_group.sockets.length === 2) {
							this.physical_groups.push(current_group);
							current_group	= {
								sockets: []
							}
						}
					})
				});
			},
			toggle: function(socket, event) {
				axios.put(`${base_url}/socket/${socket.id}/toggle`).then((res, err) => {
					if(err) {
						console.log('error: ', err);
						return;
					}
					const new_value = res.data.value;
					console.log('sockets: ', this.sckts, socket);
					socket.pin.value = new_value;
					this.sckts.forEach(s => {
						if(s.pin && s.pin.pin && s.pin.pin === socket.pin.pin) {
							s.pin.value = new_value;
						}
					});
					console.log('toggle response', res);
				});
			}
		}
	}
</script>

<style scoped lang="css">
	@import 'styles.css';
</style>

/* eslint-disable */

// const axios = require('axios');

// exports default {
// 	name: 'app',
// 	data: () => {
// 		return {
// 			hello: 'Hai gais!',
// 			msg: `System: OK...`,
// 			_groups: [],
// 			_sockets: [],
// 			current_layout: {}
// 		}
// 	},
// 	methods: {
// 		groups: (what) => {
// 			console.log('groups called...', what)
// 			axios.get('http://localhost:8888/groups').then(
// 				(res, err) => {
// 					if(err) {
// 						console.log('error: ', err);
// 						return;
// 					};

// 					console.log('groups fetched: ', res);
// 					if(res.data && res.data.groups) {
// 					}
// 					return groups;
// 				});
// 		},
// 		test: (check) => {
// 			console.log('checking: ', check)
// 		}
// 	}
// }
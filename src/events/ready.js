const { Event } = require('klasa');
//const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'ready',
			enabled: true
		});
	}

	async run() {
       

	}

	async init() {
		this.client.user.setActivity('Working On Beta', { type: 'STREAMING', url: "http://lunar-labs.io" })
  .then(presence => console.log(`Activity set to ${presence.activity.name}`))
  .catch(console.error);
	}

};
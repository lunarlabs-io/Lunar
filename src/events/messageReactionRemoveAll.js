const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'messageReactionRemoveAll',
			enabled: true
		});
	}

	async run(messageReaction, user) {
        if (!user.guild) return;
        
      
        
    //    

        
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};
const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'messageDelete',
			enabled: true
		});
	}

	async run(message) {
        if (!message.guild) return;
        const log = message.guild.channels.get(message.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;
      
        const embed = new MessageEmbed()
			.setColor('RED')
			.setTimestamp()
			.setAuthor("Message Deleted")
			.addField(`Message Author:`, message.author.tag)
			.addField(`Message Channel:`, `${message.channel.name} (${message.channel.id})`)
			.addField(`Message ID:`, message.id)
			.addField(`Message Content:`, message.cleanContent.length >= 1 ? message.cleanContent.substring(0, 960) : '-');

        log.send(embed);
        
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};